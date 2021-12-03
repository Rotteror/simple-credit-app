import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Credit } from './credit.entity';


@Entity('credit_status')
export class Status extends BaseEntity {
    
    @PrimaryGeneratedColumn({type:'smallint'})
    id: number;

    @Column({type:'varchar'})
    name: string;

    @Column({type:'varchar'})
    reason: string;

    // @OneToOne(()=> Credit, credit => credit.status)
    // credit: Credit;
}