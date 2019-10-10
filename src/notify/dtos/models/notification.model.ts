import {Recipient} from "../recipient";

export interface NotificationModel {
    messageCode: string;
    status: string;
    method: string;
    recipient: Recipient;
    createdAt?: Date;
}
