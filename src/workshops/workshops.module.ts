import { Module } from '@nestjs/common';
import { WorkshopsService } from './workshops.service';
import { WorkshopsController } from './workshops.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Workshop, WorkshopSchema } from './workshop.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Workshop.name,
      schema: WorkshopSchema,
    }]),
  ],
  providers: [WorkshopsService],
  controllers: [WorkshopsController]
})
export class WorkshopsModule {}
