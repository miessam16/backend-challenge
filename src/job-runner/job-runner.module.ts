import {Module} from "@nestjs/common";
import { ScheduleModule } from "nest-schedule";
import {NotifyModule} from "../notify/notify.module";
import {JobService} from "./services/job.service";

@Module({
    imports: [
        ScheduleModule.register(),
        NotifyModule
    ],
    providers: [
        JobService
    ]
})
export class JobRunnerModule {}
