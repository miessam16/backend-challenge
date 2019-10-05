import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {NotificationModel} from "../dtos/notification";

@Injectable()
export class NotificationQueueRepository {
    constructor(@InjectModel('NotificationQueue') private notificationQueueModel: Model) {}
    enqueue(notifications: NotificationModel[]) {
        return this.notificationQueueModel.insertMany(notifications);
    }
}
