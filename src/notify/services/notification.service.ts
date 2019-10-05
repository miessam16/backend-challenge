import {Injectable} from "@nestjs/common";
import {NotificationQueueRepository} from "../repositories/notification-queue.repository";
import {CreateNotificationRequest} from "../dtos/requests/create-notification.request";
import {NotificationModel} from "../dtos/models/notification.model";
import {StatusEnum} from "../enums/status.enum";

@Injectable()
export class NotificationService {
    constructor(private notificationQueueRepo: NotificationQueueRepository) {}

    async enqueue(request: CreateNotificationRequest) {
        const notifications: NotificationModel[] = request.recipients.map(recipient => {
            return {
                payload: recipient,
                message: request.message,
                strategy: request.strategy,
                status: StatusEnum.CREATED,
            };
        });

        const result = await this.notificationQueueRepo.enqueue(notifications);

        return {success: result.length > 0};
    }
}
