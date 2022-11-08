import { IPersona, typeDocument } from '../../domain/model/user';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Index(['document', 'documentType'], { unique: true })
export class Persona implements IPersona {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  middleName: string;

  @Column()
  lastName: string;

  @Index()
  @Column()
  age: number;

  @Column({ type: 'varchar', nullable: true })
  birthplace: string;
  @Column({ type: 'text' })
  photo: string;
  @Column()
  document: string;
  @Column()
  documentType: typeDocument;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updateAt: Date;
}
