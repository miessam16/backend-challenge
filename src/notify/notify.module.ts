import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {NotificationQueueSchema} from "./schemas/notification-queue.schema";
import {NotificationsController} from "./controllers/notifications.controller";
import {NotificationService} from "./services/notification.service";
import {NotificationQueueRepository} from "./repositories/notification-queue.repository";

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'NotificationQueue', schema: NotificationQueueSchema}])
    ],
    controllers: [
        NotificationsController,
    ],
    providers: [
        NotificationService,
        NotificationQueueRepository,
    ]
})
export class NotifyModule {}
