import {Injectable, Logger} from "@nestjs/common";
import {NotificationQueueRepository} from "../repositories/notification-queue.repository";
import {CreateNotificationRequest} from "../dtos/requests/create-notification.request";
import {NotificationModel} from "../dtos/models/notification.model";
import {StatusEnum} from "../enums/status.enum";
import {ModuleRef} from "@nestjs/core";
import {StrategyInterface} from "../strategies/strategy.interface";
import {RedisService} from "nestjs-redis";

@Injectable()
export class NotificationService {
    constructor(private notificationQueueRepo: NotificationQueueRepository, private moduleRef: ModuleRef, private redisService: RedisService) {}

    async enqueue(request: CreateNotificationRequest) {
        const notifications: NotificationModel[] =
            request.recipients.map(recipient => {
                return {
                    recipient: recipient,
                    message: request.message,
                    method: request.method,
                    status: StatusEnum.CREATED,
                };
            });

        const result = await this.notificationQueueRepo.enqueue(notifications);

        return {success: result.length > 0};
    }

    dequeue(method: string) {
        return this.notificationQueueRepo.dequeue(method);
    }

    async consume(method: string) {
        Logger.log(`Start Sending ${method}`, NotificationService.name);

        const strategy = this.moduleRef.get<StrategyInterface>(method);
        const limit = parseInt(process.env[`${method}_LIMIT`]);
        let notification = await this.dequeue(method);
        let i = await this.redisService.getClient().incr(method);

        if (i === 1) {
            await this.redisService.getClient().expire(method, 60);
        } else if (limit > i) {
            await this.notificationQueueRepo.reset(notification.id);
        }

        while(i < limit && notification) {
            const succeeded = await strategy.send(notification.recipient, notification.message);
            const status = succeeded ? StatusEnum.SUCCEEDED : StatusEnum.FAILED;
            await this.notificationQueueRepo.finalize(notification.id, status);
            notification = await this.dequeue(method);
            i++;
        }

        Logger.log(`Done Sending ${method}, proceeded ${i} requests`, NotificationService.name);
    }
}
