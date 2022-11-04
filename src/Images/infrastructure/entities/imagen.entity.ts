import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { ObjectID } from 'mongodb';

@Entity()
export class Imagen {
  @ApiProperty({ type: () => ObjectID })
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  name: string;

  @Column()
  url: string;

  // @Column()
  // bs64: string;
}
