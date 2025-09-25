// Описание модели User
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity} from "typeorm"

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 300})
    name: string;

    @Column({type: 'varchar', length: 300})
    email: string;

    @Column({type: 'varchar', length: 50})
    password: string;

    @Column({type: 'varchar', length: 300})
    status: string;

    @Column({type: 'varchar', length: 300})
    phone: string;

    @Column({ type: 'boolean', default: false })
    isActive: boolean;
}
