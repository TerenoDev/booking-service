import {Delete, Get, JsonController, Post, Put, Req, Res} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { CategoriesEquipment } from "../models/categories-equipment.entity";
import { IsOptional, IsString } from "class-validator";
import CategoriesEquipmentService from "../services/categoriesEquipmentService";
import {Type} from "class-transformer";
class CreateCategoriesEquipmentDto {
    @IsString()
    @IsOptional()
    @Type(() => String)
    type?: string;

    @IsString()
    @IsOptional()
    @Type(() => String)
    description?: string;

    @IsString()
    @IsOptional()
    @Type(() => String)
    photoUrl?: string;
}

class CategoriesEquipmentResponseDto {
    @IsString()
    id: number;

    @IsString()
    @IsOptional()
    type?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    photoUrl?: string;
}

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
                        $ref: '#/components/schemas/CategoriesEquipment'
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
    async update( @Req() req: any, @Res() res: any) {
        const result = await CategoriesEquipmentService.updateCategoriesEquipment(req.params.id, req.body);
        if (!result) {
            return res.status(404).send({ message: "Equipment not found" });
        }
        return res.send(result);
    }

    @Delete('/:id')
    async delete(@Req() request: any, @Res() response: any) {
        const success = await CategoriesEquipmentService.deleteCategoriesEquipment(request.params.id);
        if (!success) {
            return response.status(404).send({ message: "Equipment not found" });
        }
        return response.status(204).send();
    }
}