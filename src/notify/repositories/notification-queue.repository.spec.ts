import { Test } from '@nestjs/testing';
import { NotificationQueueRepository } from './notification-queue.repository';
import { MethodsEnum } from '../enums/methods.enum';
import { StatusEnum } from '../enums/status.enum';
import { NotificationQueueModel } from '../mocks/notification-queue.model';
import { notificationsMock } from '../mocks/consume-process-notifications.mocks';

describe('Notification Repository', () => {
    let repository: NotificationQueueRepository;
    const model = new NotificationQueueModel();
    const spyOnFind = jest.spyOn(model, 'find');
    const spyOnInsertMany = jest.spyOn(model, 'insertMany');
    const spyOnLimit = jest.spyOn(model, 'limit');
    const spyOnCursor = jest.spyOn(model, 'cursor');
    const spyOnUpdateOne = jest.spyOn(model, 'updateOne');

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                NotificationQueueRepository,
                {
                    provide: 'NotificationQueueModel', useValue: model
                }
            ],
        }).compile();

        repository = module.get<NotificationQueueRepository>(NotificationQueueRepository);
    });

    it('should find notifications which aren\'t succeeded nor tries less than maximum tries', () => {
        const limit = 10;
        repository.get(MethodsEnum.SMS, limit);
        expect(spyOnFind).toBeCalledWith({
            status: {$ne: StatusEnum.SUCCEEDED},
            method: MethodsEnum.SMS,
            tries: {$lt: parseInt(process.env.SMS_LIMIT)}
        });
        expect(spyOnLimit).toBeCalledWith(limit);
        expect(spyOnCursor).toBeCalled();
    });

    it('should insert notifications', () => {
        repository.enqueue(notificationsMock);
        expect(spyOnInsertMany).toBeCalledWith(notificationsMock);
    });

    it('update notification status', () => {
        repository.finalize(notificationsMock[0].id, StatusEnum.SUCCEEDED);
        const filters = {_id: notificationsMock[0].id};
        const updates = {
            status: StatusEnum.SUCCEEDED,
            '$inc': {tries: 1}
        };
        expect(spyOnUpdateOne).toBeCalledWith(filters, updates);
    });
});
