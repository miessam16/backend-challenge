import { I18nService } from 'nestjs-i18n';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiResponse } from '@nestjs/swagger';
import { NotificationService } from '../services/notification.service';
import { CreateNotificationRequest } from '../dtos/requests/create-notification.request';

@Controller('notifications')
export class NotificationsController {
    constructor(private notificationService: NotificationService, private translateService: I18nService) {
    }

    @Post()
    @ApiResponse({status: 201, description: 'Notifications has successfully queued'})
    @ApiBadRequestResponse({isArray: true, description: 'Bad request parameters aren\'t passed'})
    create(@Body() request: CreateNotificationRequest) {
        return this.notificationService.enqueue(request);
    }
}
