import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {NotificationQueueSchema} from "./schemas/notification-queue.schema";
import {NotificationsController} from "./controllers/notifications.controller";
import {NotificationService} from "./services/notification.service";
import {NotificationQueueRepository} from "./repositories/notification-queue.repository";
import {MockSmsStrategy} from "./strategies/sms/mock-sms.strategy";
import {MockPushNotificationStrategy} from "./strategies/push-notification/mock-push-notification.strategy";
import {MethodsEnum} from "./enums/methods.enum";
import {RedisService} from "nestjs-redis";

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'NotificationQueue', schema: NotificationQueueSchema}])
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
export class NotifyModule {}
