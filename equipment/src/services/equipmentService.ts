import { ILike } from "typeorm";
import dataSource from "../config/data-source";
import { Equipment } from "../models/equipment.entity";

const equipmentRepository = dataSource.getRepository(Equipment);

export class EquipmentService {
    static async createEquipment(data: Partial<Equipment>) {
        const equipment = equipmentRepository.create(data);
        return await equipmentRepository.save(equipment);
    }

    static async listEquipment(query: any) {
        const findOptions: any = {};
        if (query.title) {
            findOptions.title = ILike(`%${query.title}%`);
        }
        return await equipmentRepository.find({ where: findOptions });
    }

    static async getEquipmentById(id: number) {
        return await equipmentRepository.findOneBy({ id });
    }

    static async updateEquipment(id: number, data: Partial<Equipment>) {
        const equipment = await equipmentRepository.findOneBy({ id });
        if (!equipment) return null;

        Object.assign(equipment, data);
        return await equipmentRepository.save(equipment);
    }

    static async deleteEquipment(id: number) {
        const equipment = await equipmentRepository.findOneBy({ id });
        if (!equipment) return false;

        await equipmentRepository.remove(equipment);
        return true;
    }


    static async markEquipmentsAsUnavailable(equipmentId: any) {
        if (!equipmentId) {
            return;
        }
        console.log("equipmentId", equipmentId);
        await equipmentRepository.update(equipmentId, {
            isAvailable: "IN_EXCHANGE",
        });

    }
}