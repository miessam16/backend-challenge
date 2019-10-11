import { ModuleRef } from '@nestjs/core';
import { I18nService } from 'nestjs-i18n';
import { StatusEnum } from '../enums/status.enum';
import { Injectable, Logger } from '@nestjs/common';
import { StrategyInterface } from '../strategies/strategy.interface';
import { NotificationModel } from '../dtos/models/notification.model';
import { CreateNotificationRequest } from '../dtos/requests/create-notification.request';
import { NotificationQueueRepository } from '../repositories/notification-queue.repository';

@Injectable()
export class NotificationService {
    constructor(private notificationQueueRepo: NotificationQueueRepository, private moduleRef: ModuleRef, private translationService: I18nService) {
    }

    async enqueue(request: CreateNotificationRequest) {
        const notifications: NotificationModel[] =
            request.recipients.map(recipient => {
                return {
                    recipient: recipient,
                    messageCode: request.messageCode,
                    method: request.method,
                    status: StatusEnum.CREATED,
                };
            });

        const result = await this.notificationQueueRepo.enqueue(notifications);

        return {success: result.length > 0};
    }

    async consume(method: string) {
        Logger.log(`Start Sending ${method}`, NotificationService.name);

        const strategy = this.moduleRef.get<StrategyInterface>(method);
        const limit = parseInt(process.env[`${method}_LIMIT`]);
        const notifications = this.notificationQueueRepo.get(method, limit);
        let notification = null;

        while (notification = await notifications.next()) {
            Logger.log(`Sending ${method} to ${notification.recipient.device}`, NotificationService.name);
            const options = {
                args: notification.recipient.messageParameters,
                lang: notification.recipient.preferredLanguage
            };
            const message = this.translationService.translate(`messages.${notification.messageCode}`, options);
            const hasSucceeded = await strategy.send(notification.recipient, message);
            const status = hasSucceeded ? StatusEnum.SUCCEEDED : StatusEnum.FAILED;
            await this.notificationQueueRepo.finalize(notification.id, status);
            Logger.log(`Sending ${method} to ${notification.recipient.device} has ${status}`, NotificationService.name);
        }

        Logger.log(`Done Sending ${method} requests`, NotificationService.name);
    }
}
