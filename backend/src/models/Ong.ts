import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('ong')
export default class Ong {

  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar')
  name: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  password: string;

  @Column('varchar')
  whatsapp: string;

  @Column('varchar')
  city: string;

  @Column('varchar')
  uf: string;
}