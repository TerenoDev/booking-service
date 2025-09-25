import { In } from "typeorm";
import dataSource from "../config/data-source";
import { Booking } from "../models/booking.entity";

const bookingRepository = dataSource.getRepository(Booking);

export class BookingService {
    static async createBooking(data: Partial<Booking>) {
        try {

            const booking = new Booking();
            booking.renterId = data.renterId;
            booking.equipmentId = data.equipmentId;
            booking.days = data.days;


            if (data.status) {
                booking.status = data.status;
            }
            if (data.message) {
                booking.message = data.message;
            }


            return await bookingRepository.save(booking);
        } catch (error) {
            console.error('Error creating booking:', error);
            throw error;
        }
    }

    static async listBookings() {
        return await bookingRepository.find();
    }

    static async getBookingById(id: number) {
        return await bookingRepository.findOneBy({ id });
    }

    static async updateBooking(id: number, data: Partial<Booking>) {
        const booking = await bookingRepository.findOneBy({ id });
        if (!booking) return null;

        Object.assign(booking, data);
        return await bookingRepository.save(booking);
    }

    static async deleteBooking(id: number) {
        const booking = await bookingRepository.findOneBy({ id });
        if (!booking) return false;

        await bookingRepository.remove(booking);
        return true;
    }
}