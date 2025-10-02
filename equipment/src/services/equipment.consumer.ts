import EquipmentController from "../controllers/equipmentController";
import { getChannel } from '../config/rabbitmq';
import {EquipmentService} from "./equipmentService";


export async function initEquipmentConsumer() {
    const channel = getChannel();

    await channel.consume('booking_equipments', async (msg) => {
        if (msg) {
            try {
                const event = JSON.parse(msg.content.toString());
                console.log('Equipment Service booking_equipments:', event);
                const { equipmentId } = event.data;
                console.log("equipmentId",equipmentId)
                await EquipmentService.markEquipmentsAsUnavailable(equipmentId);

                channel.ack(msg);
            } catch (error) {
                console.error('Error processing message:', error);
                channel.nack(msg);
            }
        }
    });
}