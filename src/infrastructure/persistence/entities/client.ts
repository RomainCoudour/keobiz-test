import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import BalanceSheetEntity from './balance-sheet';
import { Client } from '../../../application';

@Entity({ name: 'clients' })
@Index(['firstName', 'lastName'])
export default class ClientEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ type: 'varchar', nullable: false, name: 'first_name' })
  firstName!: string;

  @Column({ type: 'varchar', nullable: false, name: 'last_name' })
  lastName!: string;

  @OneToMany(() => BalanceSheetEntity, (balance) => balance.client, {
    lazy: true,
    onDelete: 'CASCADE',
    nullable: true,
  })
  balances: Promise<Relation<BalanceSheetEntity[]>>;

  static mapToModel(client: ClientEntity): Client {
    return new Client(client);
  }
}
