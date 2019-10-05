import * as mongoose from 'mongoose';
import {StatusEnum} from "../enums/status.enum";
import {StrategiesEnum} from "../enums/strategies.enum";

export const NotificationQueueSchema = new mongoose.Schema({
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
    strategy: {
        type: String,
        enum: Object.values(StrategiesEnum)
    },
    message: String,
    user: {
        type: new mongoose.Schema({
            phoneNumber: String,
        })
    }
});
