import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, ManyToOne, JoinColumn} from "typeorm";
import { IsEnum, IsInt, IsOptional, IsString } from "class-validator";
import { OpenAPI } from "routing-controllers-openapi";


@Entity()
@OpenAPI({
    description: 'categories-equipment request entity'
})
export class CategoriesEquipment extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;


    @Column({ type: 'varchar', length: 500, nullable: true })
    @IsString()
    @IsOptional()
    type: string | null;


    @Column({ type: 'varchar', length: 500, nullable: true })
    @IsString()
    @IsOptional()
    description: string | null;

    @Column({ type: 'varchar', length: 500, nullable: true })
    @IsString()
    @IsOptional()
    photoUrl: string | null;

}