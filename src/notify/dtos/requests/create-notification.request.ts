import {IsArray, IsIn, IsNotEmpty, Min, MinLength, ValidateNested} from "class-validator";
import {MethodsEnum} from "../../enums/methods.enum";
import {Type} from "class-transformer";
import {Recipient} from "../recipient";

export class CreateNotificationRequest {
    @IsNotEmpty()
    messageCode: string;
    @IsNotEmpty()
    @IsIn(Object.values(MethodsEnum))
    method: string;
    @IsArray()
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => Recipient)
    recipients: Recipient[];
}
