import { ILike } from "typeorm"
import dataSource from '../config/data-source';
import { Equipment } from '../models/equipment.entity';

class EquipmentController {
    private repository = dataSource.getRepository(Equipment);

    create = async (request: any, response: any) => {
        const { body } = request;
        const instance = this.repository.create(body);
        const result = await this.repository.save(instance);

        return response.send(result);
    }

    update = async (request: any, response: any) => {
        const { params, body } = request;
        const { id } = params;

        const instance = await this.repository.findOneBy({ id });

        for (const key in body) {
            instance[key] = body[key];
        }

        const result = await this.repository.save(instance);
        return response.send(result);
    }

    delete = async (request: any, response: any) => {
        const { params } = request;
        const { id } = params;

        const instance = await this.repository.findOneBy({ id });
        await this.repository.remove(instance);

        return response.status(204).send({});
    }

    get = async (request: any, response: any) => {
        const { params } = request;
        const { id } = params;

        const result = await this.repository.findOneBy({ id });
        return response.send(result);
    }

    list = async (request: any, response: any) => {
        const { query } = request;

        const findOptions: any = {};

        if (query.condition) {
            findOptions.condition = ILike(`%${query.condition}%`);
        }

        if (query.status) {
            findOptions.status = query.status;
        }

        const result = await this.repository.find({ where: findOptions });
        return response.send(result);
    }


}

export default EquipmentController;