import * as mongoose from 'mongoose';
import {StatusEnum} from "../enums/status.enum";
import {MethodsEnum} from "../enums/methods.enum";

export const NotificationQueueSchema = new mongoose.Schema(
    {
        status: {
            type: String,
            enum: Object.values(StatusEnum),
            index: true
        },
        startTime: {
            type: Date,
            default: null
        },
        endTime: {
            type: Date,
            default: null
        },
        method: {
            type: String,
            enum: Object.values(MethodsEnum),
            index: true
        },
        message: String,
        recipient: {
            type: new mongoose.Schema({
                phoneNumber: String,
            }, {_id: false})
        }
    }
);
