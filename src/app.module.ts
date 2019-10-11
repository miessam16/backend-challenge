import * as path from 'path';
import { Module } from '@nestjs/common';
import { I18nModule } from 'nestjs-i18n';
import { MongooseModule } from '@nestjs/mongoose';
import { NotifyModule } from './notify/notify.module';
import { JobRunnerModule } from "./job-runner/job-runner.module";
import { NotificationService } from './notify/services/notification.service';

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
export class AppModule {
}
