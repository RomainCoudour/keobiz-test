import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import BalanceSheetEntity from './balance-sheet';
import { Client } from 'src/application';

@Entity({ name: 'balance_sheets' })
@Index(['firstName', 'lastName'])
export default class ClientEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ type: 'varchar', nullable: false })
  firstName!: string;

  @Column({ type: 'varchar', nullable: false })
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
