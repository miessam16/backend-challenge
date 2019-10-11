import { Logger } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { I18nService } from 'nestjs-i18n';
import { StatusEnum } from '../enums/status.enum';
import { MethodsEnum } from '../enums/methods.enum';
import { Test, TestingModule } from '@nestjs/testing';
import { NotificationService } from './notification.service';
import { MockSmsStrategy } from '../strategies/sms/mock-sms.strategy';
import { I18nMockService, translations } from '../../core/services/i18n-mock.service';
import { NotificationQueueRepository } from '../repositories/notification-queue.repository';
import { NotificationQueueMockRepository } from '../repositories/notification-queue-mock.repository';
import { callingRepositoryParameters, createNotificationRequestMock } from '../mocks/enqueue-notifications.mocks';
import {
    method,
    methodLimit,
    notificationsLength,
    notificationsMock
} from '../mocks/consume-process-notifications.mocks';

describe('Notification Service', () => {
    let module: TestingModule;
    let notificationService: NotificationService;
    let notificationQueueRepository: NotificationQueueRepository;
    let spyOnLog = jest.spyOn(Logger, 'log').mockImplementation((message: string, context: string) => {
    });

    beforeEach(async () => {
        module = await Test.createTestingModule({
            providers: [
                NotificationService,
                {
                    provide: NotificationQueueRepository, useClass: NotificationQueueMockRepository
                },
                {
                    provide: I18nService, useClass: I18nMockService
                },
                {
                    provide: MethodsEnum.SMS, useClass: MockSmsStrategy
                }
            ]
        }).compile();

        notificationService = module.get<NotificationService>(NotificationService);
        notificationQueueRepository = module.get<NotificationQueueRepository>(NotificationQueueRepository);
    });

    it('should enqueue notifications', () => {
        const spyOnEnqueue = jest.spyOn(notificationQueueRepository, 'enqueue');
        expect(notificationService.enqueue(createNotificationRequestMock)).toBeTruthy();
        expect(spyOnEnqueue).toBeCalledTimes(1);
        expect(spyOnEnqueue).toBeCalledWith(callingRepositoryParameters)
    });

    it('should consume and process notifications', async () => {
        const spyOnRepositoryGetMethod = jest.spyOn(notificationQueueRepository, 'get');
        const spyOnProcessNotification = jest.spyOn(notificationService, 'processNotification');
        await notificationService.consume(method);
        expect(spyOnRepositoryGetMethod).toBeCalledTimes(1);
        expect(spyOnRepositoryGetMethod).toBeCalledWith(method, methodLimit);
        expect(spyOnProcessNotification).toBeCalledTimes(notificationsLength);
    });

    it('should send notification and set status', async () => {
        const translationService = module.get(I18nService);
        const strategy = module.get(method);
        const spyOnGet = jest.spyOn(module.get(ModuleRef), 'get');
        const spyOnTranslate = jest.spyOn(translationService, 'translate');
        const spyOnStrategy = jest.spyOn(strategy, 'send')
            .mockImplementation(() => new Promise(resolve => resolve(true)));
        const spyOnFinalize = jest.spyOn(notificationQueueRepository, 'finalize');
        await notificationService.processNotification(notificationsMock[0], method);
        expect(spyOnGet).toBeCalled();
        expect(spyOnTranslate).toBeCalled();
        expect(spyOnGet).toBeCalledWith(method);
        expect(spyOnStrategy).toBeCalledWith(notificationsMock[0].recipient, translations.en.WELCOME);
        expect(spyOnFinalize).toBeCalledWith(notificationsMock[0].id, StatusEnum.SUCCEEDED);
        expect(spyOnTranslate).toBeCalledWith(`messages.${notificationsMock[0].messageCode}`, {
            lang: notificationsMock[0].recipient.preferredLanguage,
            args: undefined
        });
    });
});
