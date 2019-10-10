import {ArgumentsHost, BadRequestException, ExceptionFilter} from "@nestjs/common";

export class BadRequestExceptionFilter implements ExceptionFilter {
    catch(exception: BadRequestException, host: ArgumentsHost): any {
        const response = host.switchToHttp().getResponse();
        const errors = exception.message.message.map(err => {
            return {
                property: err.property,
                constraints: err.constraints
            };
        });
        response.status(exception.getStatus()).json({errors});
    }
}
