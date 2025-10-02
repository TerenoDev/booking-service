// src/socket.ts
import { Server } from "socket.io";

let io: Server;

const userSockets = new Map<number, string>();

export function initSocket(server: any) {
    io = new Server(server, {
        cors: {
            origin: "*",
        }
    });

    io.on('connection', (socket) => {
        console.log('Client connected:', socket.id);

        socket.on('register', (userId: number) => {
            userSockets.set(userId, socket.id);
            console.log(`User ${userId} registered with socket ${socket.id}`);
        });

        socket.on('disconnect', () => {
            for (const [userId, sockId] of Array.from(userSockets.entries())) {
                if (sockId === socket.id) {
                    userSockets.delete(userId);
                    break;
                }
            }
            console.log('Client disconnected:', socket.id);
        });
    });
}

export function notifyUser(userId: number, event: string, data: any) {
    const socketId = userSockets.get(userId);
    if (socketId) {
        io.to(socketId).emit(event, data);
    } else {
        console.log(`User ${userId} not connected`);
    }
}

export function notifyBookingStatusChanged(booking: any, recipientUserId: number) {
    notifyUser(recipientUserId, 'booking_status_changed', {
        bookingId: booking.id,
        renterId: booking.renterId,
        equipmentId: booking.equipmentId,
        oldStatus: booking.oldStatus,
        newStatus: booking.status,
        days: booking.days,
        message: booking.message,
        updatedAt: new Date()
    });
}

export function notifyNewBooking(booking: any, ownerUserId: number) {
    notifyUser(ownerUserId, 'new_booking_request', {
        bookingId: booking.id,
        renterId: booking.renterId,
        equipmentId: booking.equipmentId,
        status: booking.status,
        days: booking.days,
        message: booking.message,
        createdAt: booking.createdAt
    });
}

