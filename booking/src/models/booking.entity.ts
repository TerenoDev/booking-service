import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn } from "typeorm";
import { IsNotEmpty, IsOptional, IsString, IsInt, Min, Max, IsIn } from "class-validator";

@Entity()
export class Booking extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 10 })
    @IsString()
    @IsNotEmpty()
    renterId: string;

    @Column({ type: 'varchar', length: 10 })
    @IsString()
    @IsNotEmpty()
    equipmentId: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ type: 'varchar', length: 50, default: 'pending' })
    @IsString()
    @IsIn(['pending', 'confirmed', 'cancelled', 'completed'])
    status: string;

    @Column({ type: 'varchar', length: 300, nullable: true })
    @IsString()
    @IsOptional()
    message: string;

    @Column({ type: 'integer' })
    @IsInt()
    @Min(1)
    @Max(365)
    days: number;
}