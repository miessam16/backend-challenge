import {BadRequestException, Body, Controller, Post} from "@nestjs/common";
import {CreateNotificationRequest} from "../dtos/requests/create-notification.request";
import {NotificationService} from "../services/notification.service";

@Controller('notifications')
export class NotificationsController {
    constructor(private notificationService: NotificationService){}
    @Post()
    create(@Body() request: CreateNotificationRequest) {
        if (request.recipients.length < 1) {
            throw new BadRequestException();
        }
        return this.notificationService.enqueue(request);
    }
}
