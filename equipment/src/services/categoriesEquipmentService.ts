import dataSource from '../config/data-source';
import { CategoriesEquipment } from '../models/categories-equipment.entity';
import { Equipment } from '../models/equipment.entity';

class CategoriesEquipmentService {
    private categoriesEquipmentRepo = dataSource.getRepository(CategoriesEquipment);
    private equipmentRepo = dataSource.getRepository(Equipment);

    async createCategoriesEquipment(data: any) {
        console.log("test1");
        const categoriesEquipment = this.categoriesEquipmentRepo.create(data);
        console.log("test3");
        console.log(data);
        const result = await this.categoriesEquipmentRepo.save(categoriesEquipment);
        console.log("test2");
        console.log(result);


        return result;
    }

    async updateCategoriesEquipment(id: number, data: any) {
        const categoriesEquipment = await this.categoriesEquipmentRepo.findOneBy({ id });
        if (!categoriesEquipment) throw new Error('Exchange not found');

        Object.assign(categoriesEquipment, data);
        return this.categoriesEquipmentRepo.save(categoriesEquipment);
    }

    async deleteCategoriesEquipment(id: number) {
        const categoriesEquipment = await this.categoriesEquipmentRepo.findOneBy({ id });
        if (!categoriesEquipment) throw new Error('CategoriesEquipment not found');

        return this.categoriesEquipmentRepo.remove(categoriesEquipment);
    }

    async getCategoriesEquipment(id: number) {
        return this.categoriesEquipmentRepo.findOneBy({ id });
    }

    async listCategoriesEquipment(filters: any) {
        const findOptions: any = {};
        if (filters.status) findOptions.status = filters.status;
        if (filters.initiatorId) findOptions.initiatorId = Number(filters.initiatorId);

        return this.categoriesEquipmentRepo.find({ where: findOptions });
    }


}

export default new CategoriesEquipmentService();