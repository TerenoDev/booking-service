import { Body, Delete, Get, JsonController, Param, Post, Put, QueryParams, Res } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { Booking } from "../models/booking.entity";
import { BookingService } from "../services/bookingService";
import { Response } from 'express';

@JsonController('/bookings')
export default class BookingController {

    @Post()
    @OpenAPI({
        summary: 'Create a new booking',
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/Booking'
                    }
                }
            }
        }
    })
    @ResponseSchema(Booking)
    async create(@Body() body: Partial<Booking>, @Res() res: Response) {
        try {
            const result = await BookingService.createBooking(body);
            return res.status(201).send(result);
        } catch (error) {
            return res.status(400).send({ message: error.message });
        }
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
    async list(
        @QueryParams() query: {
            renterId?: string;
            equipmentId?: string;
            status?: string;
        },
        @Res() res: Response
    ) {
        try {
            const result = await BookingService.listBookings(query);
            return res.send(result);
        } catch (error) {
            return res.status(400).send({ message: error.message });
        }
    }

    @Get('/:id')
    @OpenAPI({
        summary: 'Get booking by ID',
        parameters: [
            {
                name: 'id',
                in: 'path',
                required: true,
                schema: { type: 'number' }
            }
        ]
    })
    async get(@Param('id') id: number, @Res() res: Response) {
        try {
            const result = await BookingService.getBookingById(id);
            if (!result) {
                return res.status(404).send({ message: "Booking not found" });
            }
            return res.send(result);
        } catch (error) {
            return res.status(400).send({ message: error.message });
        }
    }

    @Put('/:id')
    @OpenAPI({
        summary: 'Update booking',
        parameters: [
            {
                name: 'id',
                in: 'path',
                required: true,
                schema: { type: 'number' }
            }
        ],
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/Booking'
                    }
                }
            }
        }
    })
    async update(@Param('id') id: number, @Body() body: Partial<Booking>, @Res() res: Response) {
        try {
            const result = await BookingService.updateBooking(id, body);
            if (!result) {
                return res.status(404).send({ message: "Booking not found" });
            }
            return res.send(result);
        } catch (error) {
            return res.status(400).send({ message: error.message });
        }
    }

    @Delete('/:id')
    @OpenAPI({
        summary: 'Delete booking',
        parameters: [
            {
                name: 'id',
                in: 'path',
                required: true,
                schema: { type: 'number' }
            }
        ]
    })
    async delete(@Param('id') id: number,
                 @Res() res: Response) {
        try {
            const success = await BookingService.deleteBooking(id);
            if (!success) {
                return res.status(404).send({ message: "Booking not found" });
            }
            return res.status(204).send();
        } catch (error) {
            return res.status(400).send({ message: error.message });
        }
    }
}