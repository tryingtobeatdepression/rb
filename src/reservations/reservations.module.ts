import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Reservation, ReservationSchema } from './reservation.schema';
import { NoClashesRule } from 'src/pipes/no-clashes.constraint';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Reservation.name,
      schema: ReservationSchema,
    }]),
  ],
  providers: [NoClashesRule, ReservationsService],
  controllers: [ReservationsController]
})
export class ReservationsModule {}
