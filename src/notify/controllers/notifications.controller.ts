import {BadRequestException, Body, Controller, Post} from "@nestjs/common";
import {CreateNotificationRequest} from "../dtos/requests/create-notification.request";
import {NotificationService} from "../services/notification.service";
import {I18nService} from "nestjs-i18n";

@Controller('notifications')
export class NotificationsController {
    constructor(private notificationService: NotificationService, private translateService: I18nService){}

    @Post()
    create(@Body() request: CreateNotificationRequest) {
        return this.notificationService.enqueue(request);
    }
}
