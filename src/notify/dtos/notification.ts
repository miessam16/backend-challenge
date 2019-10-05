import {Recipient} from "./recipient";

export interface NotificationModel {
    message: string;
    status: string;
    strategy: string;
    payload: Recipient
}
