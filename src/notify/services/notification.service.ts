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
    constructor(private notificationQueueRepo: NotificationQueueRepository, private moduleRef: ModuleRef) {}

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

        Logger.log(`Done Sending ${method}, proceeded  requests`, NotificationService.name);
    }
}
