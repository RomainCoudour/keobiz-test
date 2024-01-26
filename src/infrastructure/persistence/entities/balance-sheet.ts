import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Relation,
} from 'typeorm';
import ClientEntity from './client';
import { BalanceSheet, Client } from '../../../application';

@Entity({ name: 'balance_sheets' })
@Index(['client', 'year'])
export default class BalanceSheetEntity {
  @PrimaryColumn({ type: 'integer' })
  year!: number;

  @PrimaryColumn({ type: 'integer', name: 'client_id' })
  @ManyToOne(() => ClientEntity, (client) => client.id, {
    nullable: false,
  })
  @JoinColumn({ name: 'client_id' })
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
      result: Number(balanceSheet.result),
    });
  }
}
