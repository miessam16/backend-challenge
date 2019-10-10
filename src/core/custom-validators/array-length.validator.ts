import {ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface} from "class-validator";

@ValidatorConstraint({name: 'arrayLength', async: false})
export class ArrayLengthValidator implements ValidatorConstraintInterface {
    validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
        return value.length > 0;
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        console.log(validationArguments);
        return `${validationArguments.property} 's length is less than 0`;
    }
}