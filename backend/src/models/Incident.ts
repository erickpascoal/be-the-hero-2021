import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import Ong from "./Ong";

@Entity('incident')
export default class Incident {

  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar')
  title: string;

  @Column('varchar')
  description: string;

  @Column('double precision')
  value: number;

  @Column('int4', { name: 'ong_id' })
  ongId: number;

  @ManyToOne(() => Ong)
  @JoinColumn({ name: 'ong_id' })
  ong: Ong;

}