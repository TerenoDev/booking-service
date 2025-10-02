import { Post, Get, Put, Delete, Req, Res, JsonController } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { IsString, IsNumber, IsIn, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import dataSource from '../config/data-source';
import { Booking } from '../models/booking.entity';
import { BookingService } from "../services/bookingService";
import {notifyNewBooking} from "../socket";
class CreateBookingDto {
    @IsString()
    @Type(() => String)
    renterId: string;

    @IsString()
    @Type(() => String)
    equipmentId: string;

    @IsNumber()
    @Type(() => Number)
    days: number;

    @IsString()
    @IsIn(['pending', 'confirmed', 'cancelled', 'completed'])
    @IsOptional()
    status?: string = 'pending';

    @IsString()
    @IsOptional()
    message?: string;
}

class UpdateBookingDto {
    @IsString()
    @IsIn(['pending', 'confirmed', 'cancelled', 'completed'])
    @IsOptional()
    status?: string;

    @IsString()
    @IsOptional()
    message?: string;

    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    days?: number;
}

class BookingResponseDto {
    @IsNumber()
    id: number;

    @IsString()
    renterId: string;

    @IsString()
    equipmentId: string;

    @IsNumber()
    days: number;

    @IsString()
    status: string;

    @IsString()
    @IsOptional()
    message?: string;

    @IsString()
    createdAt: string;
}

class ErrorResponseDto {
    @IsString()
    message: string;
}

class SuccessResponseDto {
    @IsString()
    message: string;
}

class BookingListResponseDto {
    @IsNumber()
    count: number;

    bookings: BookingResponseDto[];
}

@JsonController('/booking')
export default class BookingController {

    @Post()
    @OpenAPI({
        summary: 'Create a new booking',
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/Booking'
                    },
                    example: {
                        renterId: "user123",
                        equipmentId: "eq456",
                        days: 7,
                        status: "pending",
                        message: "Additional notes"
                    }
                }
            }
        }
    })
    @ResponseSchema(Booking)
    async create(@Req() request: any, @Res() response: any) {
        const bookingRepository = dataSource.getRepository(Booking);
        const booking = bookingRepository.create(request.body);
        const results = await bookingRepository.save(booking);
        console.log(results);

        const savedBooking = results[0];
        await BookingService.changeAvailable(savedBooking.equipmentId);
        notifyNewBooking(booking, parseInt(savedBooking.renterId));
        return response.send(results);
    }

    @Get()
    @OpenAPI({
        summary: 'Get list of bookings',
        parameters: [
            {
                name: 'renterId',
                in: 'query',
                required: false,
                schema: { type: 'string' }
            },
            {
                name: 'equipmentId',
                in: 'query',
                required: false,
                schema: { type: 'string' }
            },
            {
                name: 'status',
                in: 'query',
                required: false,
                schema: { type: 'string' }
            }
        ]
    })
    @ResponseSchema(Booking, { isArray: true })
    async list(@Req() request: any, @Res() response: any) {
        const bookingRepository = dataSource.getRepository(Booking);

        const where: any = {};
        if (request.query.renterId) where.renterId = request.query.renterId;
        if (request.query.equipmentId) where.equipmentId = request.query.equipmentId;
        if (request.query.status) where.status = request.query.status;

        const results = await bookingRepository.find({ where });
        return response.send(results);
    }

    @Get('/:id')
    @OpenAPI({
        summary: 'Get booking by ID'
    })
    @ResponseSchema(Booking)
    async get(@Req() request: any, @Res() response: any) {
        const bookingRepository = dataSource.getRepository(Booking);
        const id = parseInt(request.params.id);

        const results = await bookingRepository.findOneBy({ id });

        if (!results) {
            return response.status(404).send({ message: "Booking not found" });
        }

        return response.send(results);
    }
    //
    @Put('/:id')
    @OpenAPI({
        summary: 'Update booking'
    })
    @ResponseSchema(Booking)
    async update(@Req() request: any, @Res() response: any) {
        const bookingRepository = dataSource.getRepository(Booking);
        const id = parseInt(request.params.id);


        const existingBooking = await bookingRepository.findOneBy({ id });
        if (!existingBooking) {
            return response.status(404).send({ message: "Booking not found" });
        }


        await bookingRepository.update(id, request.body);
        const updatedBooking = await bookingRepository.findOneBy({ id });

        return response.send(updatedBooking);
    }

    @Delete('/:id')
    @OpenAPI({
        summary: 'Delete booking'
    })
    async delete(@Req() request: any, @Res() response: any) {
        const bookingRepository = dataSource.getRepository(Booking);
        const id = parseInt(request.params.id);

        const existingBooking = await bookingRepository.findOneBy({ id });
        if (!existingBooking) {
            return response.status(404).send({ message: "Booking not found" });
        }

        await bookingRepository.delete(id);
        return response.send({ message: "Booking deleted successfully" });
    }
}