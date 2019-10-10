import {Injectable} from "@nestjs/common";
import {Cron, NestSchedule } from 'nest-schedule';
import {NotificationService} from "../../notify/services/notification.service";
import {MethodsEnum} from "../../notify/enums/methods.enum";


@Injectable()
export class JobService extends NestSchedule {
    constructor(private notificationService: NotificationService) {
        super();
    }

    @Cron('* * * * *', {key: MethodsEnum.SMS})
    async smsJob() {
        //await this.notificationService.consume(MethodsEnum.SMS);
    }

    @Cron('* * * * *', {key: MethodsEnum.SMS})
    async pushNotificationJob() {
        //await this.notificationService.consume(MethodsEnum.PUSH_NOTIFICATION);
    }
}