import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MethodsEnum } from './enums/methods.enum';
import { MockSmsStrategy } from './strategies/sms/mock-sms.strategy';
import { NotificationService } from './services/notification.service';
import { NotificationQueueSchema } from './schemas/notification-queue.schema';
import { NotificationsController } from './controllers/notifications.controller';
import { NotificationQueueRepository } from './repositories/notification-queue.repository';
import { MockPushNotificationStrategy } from './strategies/push-notification/mock-push-notification.strategy';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: 'NotificationQueue',
            schema: NotificationQueueSchema,
            collection: 'notifications-queue'
        }])
    ],
    controllers: [
        NotificationsController,
    ],
    exports: [
        NotificationService,
        NotificationQueueRepository
    ],
    providers: [
        NotificationService,
        NotificationQueueRepository,
        {
            provide: MethodsEnum.SMS, useClass: MockSmsStrategy
        },
        {
            provide: MethodsEnum.PUSH_NOTIFICATION, useClass: MockPushNotificationStrategy
        }
    ]
})
export class NotifyModule {
}
