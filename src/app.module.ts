import { Module } from '@nestjs/common';
import {NotifyModule} from "./notify/notify.module";
import { MongooseModule } from '@nestjs/mongoose';
console.log(process.env.MONGO_URL);
@Module({
  imports: [
      MongooseModule.forRoot(process.env.MONGO_URL, {useNewUrlParser: true}),
      NotifyModule
  ],
})
export class AppModule {}
