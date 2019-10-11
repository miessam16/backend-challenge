import { Test } from '@nestjs/testing';
import { JobService } from './job.service';
import { ScheduleModule } from 'nest-schedule';
import { MethodsEnum } from '../../notify/enums/methods.enum';
import { NotificationService } from '../../notify/services/notification.service';

describe('Job Service', () => {
    let jobService: JobService;
    let notificationService = {
        consume: (method: string) => {
        }
    };
    let spyOnNotificationService;

    beforeEach(async () => {
        const module = await Test
            .createTestingModule({
                providers: [
                    JobService,
                    {
                        provide: NotificationService, useValue: notificationService
                    }
                ],
                imports: [ScheduleModule.register()]
            }).compile();
        jobService = module.get<JobService>(JobService);
        spyOnNotificationService = jest.spyOn(notificationService, 'consume');
    });

    it('should call notification service to consume sms notifications', () => {
        jobService.smsJob();
        expect(spyOnNotificationService).toBeCalled();
        expect(spyOnNotificationService).toBeCalledWith(MethodsEnum.SMS);
    });

    it('should call notification service to consume push notifications', () => {
        jobService.pushNotificationJob();
        expect(spyOnNotificationService).toBeCalled();
        expect(spyOnNotificationService).toBeCalledWith(MethodsEnum.PUSH_NOTIFICATION);
    });
});