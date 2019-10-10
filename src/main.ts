import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import {INestApplication, ValidationPipe} from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {BadRequestExceptionFilter} from "./core/filters/bad-request-exception..filter";

export let app: INestApplication;

async function bootstrap() {
  app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new BadRequestExceptionFilter());
  app.setGlobalPrefix('api/v1');
  const options = new DocumentBuilder()
      .setTitle('Notifications Service')
      .setDescription('The notifications service api documentation')
      .setVersion('1.0')
      .addTag('notifications')
      .setBasePath('api/v1')
      .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
  await app.listen(process.env.PORT);
}
bootstrap();
