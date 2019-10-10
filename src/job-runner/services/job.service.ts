import { Injectable } from '@nestjs/common';
import { Cron, NestSchedule } from 'nest-schedule';
import { MethodsEnum } from '../../notify/enums/methods.enum';
import { NotificationService } from '../../notify/services/notification.service';


@Injectable()
export class JobService extends NestSchedule {
    constructor(private notificationService: NotificationService) {
        super();
    }

    @Cron('* * * * *', {key: MethodsEnum.SMS})
    async smsJob() {
        await this.notificationService.consume(MethodsEnum.SMS);
    }

    @Cron('* * * * *', {key: MethodsEnum.PUSH_NOTIFICATION})
    async pushNotificationJob() {
        await this.notificationService.consume(MethodsEnum.PUSH_NOTIFICATION);
    }
}
