import { Module } from '@nestjs/common';
import {NotifyModule} from "./notify/notify.module";
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
      MongooseModule.forRoot(process.env.MONGO_URL, {useNewUrlParser: true}),
      NotifyModule
  ],
})
export class AppModule {}
