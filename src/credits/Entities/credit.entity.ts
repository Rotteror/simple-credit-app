import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from './status.entity'


@Entity('credit')
export class Credit extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ type: 'datetime' })
    contract_time: Date;

    @Column({ type: 'datetime' })
    create_time: Date;

    @Column({ type: 'varchar' })
    discount_code: string;

    @Column({ type: 'date' })
    due_date: Date;

    @Column({ type: 'bit' })
    forfeit_accruals_enabled: number;

    @Column({ type: 'decimal' })
    installment_days: number;

    @Column({ type: 'smallint' })
    installments_number: number;

    @Column({ type: 'decimal' })
    principal: number;

    @Column({ type: 'datetime' })
    utilization_time: Date;


    @OneToOne(() => Status, {eager:true})
    @JoinColumn({ name: "credit_status_id"})
    status: Status;

    @Column({ type: 'bigint' })
    operator_id: number;

    @Column({ type: 'bigint' })
    product_id: number;

    @Column({ type: 'bigint' })
    user_id: number;

    @Column({ type: 'date' })
    repayment_date: number;

}