import * as faker from 'faker';
import { StatusEnum } from '../enums/status.enum';
import { MethodsEnum } from '../enums/methods.enum';
import { LanguagesEnum } from '../enums/languages.enum';
import { NotificationModel } from '../dtos/models/notification.model';

const phone = faker.phone.phoneNumber();
const messageCode = 'WELCOME';

export const createNotificationRequestMock = {
    messageCode,
    method: MethodsEnum.SMS,
    recipients: [
        {
            device: phone,
            preferredLanguage: LanguagesEnum.EN
        }
    ]
};

export const callingRepositoryParameters: NotificationModel[] = [{
    messageCode,
    method: MethodsEnum.SMS,
    status: StatusEnum.CREATED,
    recipient: {
        preferredLanguage: LanguagesEnum.EN,
        device: phone,
    }
}];
