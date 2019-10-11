import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { StatusEnum } from '../enums/status.enum';
import { NotificationModel } from '../dtos/models/notification.model';

@Injectable()
export class NotificationQueueRepository {
    constructor(@InjectModel('NotificationQueue') private notificationQueueModel: Model) {
    }

    enqueue(notifications: NotificationModel[]) {
        return this.notificationQueueModel.insertMany(notifications);
    }

    get(method: string, limit: number) {
        return this.notificationQueueModel.find({
            method,
            status: {$ne: StatusEnum.SUCCEEDED},
            tries: {$lt: parseInt(process.env.MAXIMUM_TRIES)}
        }).limit(limit).cursor();
    }

    finalize(id: string, status: string) {
        return this.notificationQueueModel.updateOne({_id: id}, {status, $inc: {tries: 1}});
    }
}
