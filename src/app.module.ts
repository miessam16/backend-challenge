import { Module } from '@nestjs/common';
import {NotifyModule} from "./notify/notify.module";
import { MongooseModule } from '@nestjs/mongoose';
import {RedisModule} from "nestjs-redis";
import {JobRunnerModule} from "./job-runner/job-runner.module";

@Module({
  imports: [
      MongooseModule.forRoot(process.env.MONGO_URL, {useNewUrlParser: true, useFindAndModify: false}),
      RedisModule.register({url: process.env.REDIS_URL}),
      NotifyModule,
      JobRunnerModule
  ],
})
export class AppModule {}
