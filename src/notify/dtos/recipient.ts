import {IsIn, IsNotEmpty} from "class-validator";
import {LanguagesEnum} from "../enums/languages.enum";

export class Recipient {
    @IsNotEmpty()
    device: string;
    @IsNotEmpty()
    @IsIn(Object.values(LanguagesEnum))
    preferredLanguage: string;
    messageParameters?: {[key: string]: string};
}
