import { NotificationModel } from '../dtos/models/notification.model';
import { notificationsMock } from '../mocks/consume-process-notifications.mocks';

export class NotificationQueueMockRepository {
    enqueue(notifications: NotificationModel[]): Promise<{ length: number }> {
        return new Promise<{ length: number }>(resolve => resolve({length: notifications.length}));
    }

    * get(method: string, limit: number) {
        for (const notification of notificationsMock) {
            yield new Promise(resolve => resolve(notification));
        }
    }

    finalize(id: string, status: string) {
        return new Promise(resolve => resolve({n: 1, nModified: 1, ok: 1}));
    }
}
