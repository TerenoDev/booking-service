import {Body, Delete, Get, JsonController, Param, Post, Put, QueryParam, Req, Res} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { CategoriesEquipment } from "../models/categories-equipment.entity";
import { IsEnum, IsInt, IsOptional, IsString } from "class-validator";
//import EquipmentService from "../services/equipmentService";
//import { getChannel } from "../config/rabbitmq";
import {Equipment} from "../models/equipment.entity";
import CategoriesEquipmentService from "../services/categoriesEquipmentService";
// // DTO
// class CreateCategoriesEquipmentDTO {
//
//     @IsString()
//     @IsOptional()
//     type?: string;
//
//     @IsString()
//     @IsOptional()
//     description?: string;
//
//     @IsString()
//     @IsOptional()
//     photoUrl?: string;
// }

// class UpdateExchangeDTO {
//     @IsEnum(['PENDING', 'ACCEPTED', 'REJECTED'])
//     @IsOptional()
//     status?: 'PENDING' | 'ACCEPTED' | 'REJECTED';
//
//     @IsString()
//     @IsOptional()
//     message?: string;
// }
//
// class ExchangeFilterDTO {
//     @IsEnum(['PENDING', 'ACCEPTED', 'REJECTED'])
//     @IsOptional()
//     status?: 'PENDING' | 'ACCEPTED' | 'REJECTED';
//
//     @IsInt()
//     @IsOptional()
//     initiatorId?: number;
// }

@JsonController('/categories-equipment')
@OpenAPI({ tags: ['CategoriesEquipment'] })
export default class CategoriesEquipmentController {
    @Post()
    @OpenAPI({
        summary: 'Create a new equipment request',
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/categoriesEquipment'
                    },
                    example: {
                        type: "PENDING",
                        description: "PENDING",
                        photoUrl: "PENDING"
                    }
                }
            }
        }
    })
    @ResponseSchema(CategoriesEquipment)
    async create(@Req() req: any, @Res() res: any) {
        const result = await CategoriesEquipmentService.createCategoriesEquipment(req.body);
        return res.send(result);
    }


    @Get()
    async list(@Req() req: any, @Res() res: any) {
        const result = await CategoriesEquipmentService.listCategoriesEquipment(req.query);
        return res.send(result);
    }

    @Get('/:id')
    get = async (request: any, response: any) => {
        const { params } = request;
        const { id } = params;

        const result = await CategoriesEquipmentService.getCategoriesEquipment(id);
        return response.send(result);
    }


    @Put('/:id')
    async update(@Param("id") id: number, @Req() req: any, @Res() res: any) {
        const result = await CategoriesEquipmentService.updateCategoriesEquipment(id, req.body);
        if (!result) {
            return res.status(404).send({ message: "Equipment not found" });
        }
        return res.send(result);
    }

    @Delete('/:id')
    async delete(@Param("id") id: number, @Res() res: any) {
        const success = await CategoriesEquipmentService.deleteCategoriesEquipment(id);
        if (!success) {
            return res.status(404).send({ message: "Equipment not found" });
        }
        return res.status(204).send();
    }
}