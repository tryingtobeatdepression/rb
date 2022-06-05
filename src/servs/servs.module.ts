import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Serv, ServSchema } from './serv.schema';
import { ServsController } from './servs.controller';
import { ServsService } from './servs.service';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Serv.name,
      schema: ServSchema,
    }]),
  ],
  controllers: [ServsController],
  providers: [ServsService]
})
export class ServsModule {}
