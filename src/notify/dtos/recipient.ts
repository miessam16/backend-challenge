import { ApiModelProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty } from 'class-validator';
import { LanguagesEnum } from '../enums/languages.enum';

export class Recipient {
    @ApiModelProperty({
        required: true,
        description: 'Device id or phone number which will send notification to',
        example: '201207778055'
    })
    @IsNotEmpty()
    device: string;
    @ApiModelProperty({required: true, enum: LanguagesEnum, description: 'Preferred user language code'})
    @IsNotEmpty()
    @IsIn(Object.values(LanguagesEnum))
    preferredLanguage: string;
    @ApiModelProperty({
        required: false,
        isArray: true,
        description: 'Message parameters which will be used to generate the message',
        example: {code: '555555'}
    })
    messageParameters?: { [key: string]: string };
}
