import {IsArray, IsIn, IsNotEmpty, Min, MinLength, Validate, ValidateNested} from "class-validator";
import {MethodsEnum} from "../../enums/methods.enum";
import {Type} from "class-transformer";
import {Recipient} from "../recipient";
import {ArrayLengthValidator} from "../../../core/custom-validators/array-length.validator";
import {MessageCodeValidator} from "../../../core/custom-validators/message-code.validator";

export class CreateNotificationRequest {
    @IsNotEmpty()
    @Validate(MessageCodeValidator)
    messageCode: string;
    @IsNotEmpty()
    @IsIn(Object.values(MethodsEnum))
    method: string;
    @IsArray()
    @IsNotEmpty()
    @ValidateNested()
    @Validate(ArrayLengthValidator)
    @Type(() => Recipient)
    recipients: Recipient[];
}
