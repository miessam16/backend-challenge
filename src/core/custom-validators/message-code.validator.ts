import {ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface} from "class-validator";
import {I18nService} from "nestjs-i18n";
import {app} from "../../main";

@ValidatorConstraint({name: 'messageNotFound', async: false})
export class MessageCodeValidator implements ValidatorConstraintInterface {

    defaultMessage(validationArguments?: ValidationArguments): string {
        return 'message code not found';
    }

    validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
        const message = app.get(I18nService).translate(`messages.${value}`);
        return message !== `messages.${value}`;
    }

}
