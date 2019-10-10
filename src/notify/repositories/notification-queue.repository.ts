import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {NotificationModel} from "../dtos/models/notification.model";
import {StatusEnum} from "../enums/status.enum";

@Injectable()
export class NotificationQueueRepository {
    constructor(@InjectModel('NotificationQueue') private notificationQueueModel: Model) {}

    enqueue(notifications: NotificationModel[]) {
        return this.notificationQueueModel.insertMany(notifications);
    }

    get(method: string, limit: number) {
        return this.notificationQueueModel.find({method, status: StatusEnum.CREATED}).limit(limit);
    }

    finalize(id: string, status: string) {
        return this.notificationQueueModel.updateOne({_id: id}, {status});
    }

    reset(id: string) {
        return this.notificationQueueModel.updateOne({_id: id}, {status: StatusEnum.CREATED, startTime: null});
    }
}
