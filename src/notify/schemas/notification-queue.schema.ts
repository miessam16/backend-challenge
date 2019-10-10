import * as mongoose from 'mongoose';
import {StatusEnum} from "../enums/status.enum";
import {MethodsEnum} from "../enums/methods.enum";
import {LanguagesEnum} from "../enums/languages.enum";

export const NotificationQueueSchema = new mongoose.Schema(
    {
        status: {
            type: String,
            enum: Object.values(StatusEnum),
            index: true
        },
        createdAt: {
            type: Date,
            default: new Date()
        },
        method: {
            type: String,
            enum: Object.values(MethodsEnum),
            index: true
        },
        messageCode: String,
        tries: {
            type: Number,
            default: 0,
            index: true,
        },
        recipient: {
            type: new mongoose.Schema({
                device: String, // phone number || device id according to selected method
                messageParameters: Object,
                preferredLanguage: {
                    type: String,
                    enum: Object.values(LanguagesEnum)
                }
            }, {_id: false})
        }
    }
);
