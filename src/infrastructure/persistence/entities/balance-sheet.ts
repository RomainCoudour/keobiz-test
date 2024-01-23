import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryColumn,
  Relation,
} from 'typeorm';
import ClientEntity from './client';
import { BalanceSheet, Client } from 'src/application';

@Entity({ name: 'clients' })
@Index(['client', 'year'])
export default class BalanceSheetEntity {
  @PrimaryColumn({ type: 'integer' })
  year!: number;

  @PrimaryColumn({ type: 'integer' })
  @ManyToOne(() => ClientEntity, (client) => client.balances, {
    nullable: false,
  })
  client!: Relation<ClientEntity>;

  @Column({ type: 'decimal', nullable: false })
  result: number;

  static mapToModel(
    balanceSheet: BalanceSheetEntity,
    client: Client
  ): BalanceSheet {
    return new BalanceSheet({
      year: balanceSheet.year,
      client,
      result: balanceSheet.result,
    });
  }
}
