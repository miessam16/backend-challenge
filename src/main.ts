import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {INestApplication, ValidationPipe} from "@nestjs/common";
import {BadRequestExceptionFilter} from "./core/filters/bad-request-exception..filter";

export let app: INestApplication;

async function bootstrap() {
  app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new BadRequestExceptionFilter());
  app.setGlobalPrefix('api/v1');
  await app.listen(3000);
}
bootstrap();
