import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Credit } from './credit.entity'

@Entity('installment')
export class Installment extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ type: 'decimal' })
    forfeit: number;

    @Column({ type: 'date' })
    maturity_date: Date;

    @Column({ type: 'decimal' })
    interest: number;

    @Column({ type: 'smallint' })
    number: number;

    @Column({ type: 'datetime' })
    payment_date: Date;

    @Column({ type: 'decimal' })
    principal: number;


    // @Column()
    @ManyToOne(type => Credit, credit => credit.id, { eager: true })
    @JoinColumn([{ name: "credit_id", referencedColumnName: "id" }])
    credit: Credit;


    //   `id` bigint NOT NULL AUTO_INCREMENT,
    //   `forfeit` decimal(19,2) NOT NULL,
    //   `maturity_date` date NOT NULL,
    //   `interest` decimal(19,2) NOT NULL,
    //   `number` smallint NOT NULL,
    //   `payment_date` datetime DEFAULT NULL,
    //   `principal` decimal(19,2) NOT NULL,
    //   `credit_id` bigint NOT NULL,
}