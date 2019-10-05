import {Recipient} from "../recipient";

export interface NotificationModel {
    message: string;
    status: string;
    method: string;
    recipient: Recipient;
    startTime?: Date;
    endTime? : Date;
}
