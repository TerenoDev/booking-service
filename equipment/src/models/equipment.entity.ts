// Описание модели Equipment
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn} from "typeorm";
import { IsEnum, IsInt, IsOptional, IsString } from "class-validator";
import { OpenAPI } from "routing-controllers-openapi";
import {CategoriesEquipment} from "./categories-equipment.entity";

@Entity()
@OpenAPI({
    description: 'Equipment association entity'
})
export class Equipment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 , nullable: true})
    @IsString()
    @IsOptional()
    name: string;

    @Column({ type: 'varchar', length: 100 , nullable: true })
    @IsString()
    description: string;

    @Column({ type: 'varchar', length: 100 , nullable: true})
    @IsString()
    itemCondition: string;

    @Column({ type: 'int'})
    @IsInt()
    depositAmount: number;

    @Column({ type: 'varchar', length: 50 , nullable: true})
    @IsEnum(['AVAILABLE', 'IN_EXCHANGE'])
    isAvailable: 'AVAILABLE' | 'IN_EXCHANGE';

    @Column({ type: 'int'})
    @IsInt()
    minRentalDays: number;

    @ManyToOne(() => CategoriesEquipment, { eager: true })
    @JoinColumn({ name: 'categoryId' })
    category: CategoriesEquipment;

    // @Column({ nullable: true })
    // categoryId: number;
}