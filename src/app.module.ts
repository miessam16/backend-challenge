import { Module } from '@nestjs/common';
import {NotifyModule} from "./notify/notify.module";
import { MongooseModule } from '@nestjs/mongoose';
import {JobRunnerModule} from "./job-runner/job-runner.module";
import {I18nModule} from 'nestjs-i18n';
import * as path from 'path';
import {NotificationService} from './notify/services/notification.service';
import {Validator} from "class-validator";

@Module({
    imports: [
        MongooseModule.forRoot(process.env.MONGO_URL, {useNewUrlParser: true, useFindAndModify: false}),
        NotifyModule,
        JobRunnerModule,
        I18nModule.forRoot({
          path: path.join(__dirname, '/../i18n'),
          fallbackLanguage: process.env.DEFAULT_LANGUAGE,
          filePattern: '*.json',
          saveMissing: false
        }),
    ],
    providers: [
        NotificationService,
    ]
})
export class AppModule {}
