import {IsIn, IsNotEmpty, IsPhoneNumber} from "class-validator";
import {LanguagesEnum} from "../enums/languages.enum";

export class Recipient {
    @IsNotEmpty()
    @IsPhoneNumber('EG')
    phoneNumber: string;
    @IsNotEmpty()
    @IsIn(Object.values(LanguagesEnum))
    preferredLanguage: string
}
