import {IsArray, IsIn, IsNotEmpty, Validate, ValidateNested} from "class-validator";
import {MethodsEnum} from "../../enums/methods.enum";
import {Type} from "class-transformer";
import {Recipient} from "../recipient";
import {ArrayLengthValidator} from "../../../core/custom-validators/array-length.validator";
import {MessageCodeValidator} from "../../../core/custom-validators/message-code.validator";
import {ApiModelProperty} from "@nestjs/swagger";

export class CreateNotificationRequest {
    @ApiModelProperty({required: true, description: 'Message code which will be sent to the recipient', example: 'COUPON_25'})
    @IsNotEmpty()
    @Validate(MessageCodeValidator)
    messageCode: string;
    @ApiModelProperty({required: true, enum: MethodsEnum,  description: 'The method which will be used to notify the recipient'})
    @IsNotEmpty()
    @IsIn(Object.values(MethodsEnum))
    method: string;
    @ApiModelProperty({required: true, isArray: true, type: Recipient, description: 'Recipient who would receive the notification'})
    @IsArray()
    @IsNotEmpty()
    @ValidateNested()
    @Validate(ArrayLengthValidator)
    @Type(() => Recipient)
    recipients: Recipient[];
}
