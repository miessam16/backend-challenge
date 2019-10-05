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

    dequeue(method: string) {
        return this.notificationQueueModel.findOneAndUpdate({method, status: StatusEnum.CREATED}, {startTime: new Date(), status: StatusEnum.IN_PROGRESS});
    }

    finalize(id: string, status: string) {
        return this.notificationQueueModel.updateOne({_id: id}, {status, endTime: new Date()});
    }
    reset(id: string) {
        return this.notificationQueueModel.updateOne({_id: id}, {status: StatusEnum.CREATED, startTime: null});
    }
}
