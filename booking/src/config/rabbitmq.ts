import amqplib, {Channel, ChannelModel, Connection} from 'amqplib';

let connection: ChannelModel;
let channel: Channel;

export async function connectRabbitMQ() {
    try {

        connection = await amqplib.connect({
            hostname: process.env.RABBITMQ_HOST,
            port: Number(process.env.RABBITMQ_PORT)});

        channel = await connection.createChannel();

        await channel.assertQueue('booking_equipments');


        console.log('RabbitMQ connected and queues declared');
    } catch (err) {
        console.error('RabbitMQ connection error:', err);
        throw err;
    }
}

export function getChannel(): Channel {
    if (!channel) throw new Error('Channel not initialized');
    return channel;
}