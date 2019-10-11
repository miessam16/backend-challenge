import { Recipient } from '../recipient';

export interface NotificationModel {
    id?: string;
    messageCode: string;
    status: string;
    method: string;
    recipient: Recipient;
    createdAt?: Date;
}
