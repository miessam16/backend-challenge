import * as faker from 'faker';
import { StatusEnum } from '../enums/status.enum';
import { MethodsEnum } from '../enums/methods.enum';
import { LanguagesEnum } from '../enums/languages.enum';
import { NotificationModel } from '../dtos/models/notification.model';

export const methodLimit = parseInt(process.env.SMS_LIMIT);
export const method = MethodsEnum.SMS;
export const messageCode = 'WELCOME';

export const notificationsMock: NotificationModel[] = [
    {
        id: faker.random.number().toString(),
        messageCode,
        method: method,
        status: StatusEnum.CREATED,
        recipient: {
            device: faker.phone.phoneNumber(),
            preferredLanguage: LanguagesEnum.EN
        },
        createdAt: new Date()
    },
    {
        id: faker.random.number().toString(),
        messageCode,
        method: method,
        status: StatusEnum.CREATED,
        recipient: {
            device: faker.phone.phoneNumber(),
            preferredLanguage: LanguagesEnum.AR
        },
        createdAt: new Date()
    }
];

export const notificationsLength = notificationsMock.length;