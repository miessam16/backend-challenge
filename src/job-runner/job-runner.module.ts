import { Module } from '@nestjs/common';
import { ScheduleModule } from 'nest-schedule';
import { JobService } from './services/job.service';
import { NotifyModule } from '../notify/notify.module';

@Module({
    imports: [
        ScheduleModule.register(),
        NotifyModule
    ],
    providers: [
        JobService
    ]
})
export class JobRunnerModule {
}
