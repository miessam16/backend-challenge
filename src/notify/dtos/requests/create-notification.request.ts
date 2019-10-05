import {IsArray, IsIn, IsNotEmpty, Min, MinLength, ValidateNested} from "class-validator";
import {StrategiesEnum} from "../../enums/strategies.enum";
import {Type} from "class-transformer";
import {Recipient} from "../recipient";

export class CreateNotificationRequest {
    @IsNotEmpty()
    message: string;
    @IsNotEmpty()
    @IsIn(Object.values(StrategiesEnum))
    strategy: string;
    @IsArray()
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => Recipient)
    recipients: Recipient[];
}
