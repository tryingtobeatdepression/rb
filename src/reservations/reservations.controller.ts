import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { CreateReservationDto } from './create-reservation.dto';
import { ReservationsService } from './reservations.service';

@Controller('reservations')
export class ReservationsController {
    constructor(private reservationsService: ReservationsService) {}

    @Get('list')
    @HttpCode(200)
    async listForDay(@Query() query) {
        // let date: Date = query.date;
        // TODO: Check if date is a valid date
        // Get all reservations that are match with 'date'
        return await this.reservationsService.findAll();
    }

    @Post('create')
    @HttpCode(201)
    async create(@Body() createReservationDto: CreateReservationDto) {
        const reservation = await this.reservationsService.create(createReservationDto);
        return reservation ? reservation: 'A clash was found!';
    }
}
