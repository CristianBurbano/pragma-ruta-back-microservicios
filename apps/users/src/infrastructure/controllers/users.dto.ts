import { PartialType, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsPositive } from 'class-validator';

import { typeDocument } from '../../domain/model/user';

// class IdentificacionDto {
//   readonly tipo: string;
//   readonly valor: string;
// }

export class CreateUserDto {
  @Type(() => Number)
  @ApiProperty({ description: 'Edad del usuario' })
  @IsNotEmpty()
  @IsPositive()
  @IsInt()
  readonly age: number;

  @ApiProperty({ description: 'Número de Identificación del Usuario' })
  @IsNotEmpty()
  readonly document: string;

  @ApiProperty({ description: 'Tipo de Identificación del Usuario' })
  @IsNotEmpty()
  readonly documentType: typeDocument;

  @ApiProperty({ description: 'Primer nombre del Usuario' })
  @IsNotEmpty()
  readonly firstName: string;

  @ApiProperty({ description: 'Segundo nombre del Usuario', required: false })
  @IsOptional()
  readonly middleName: string;

  @ApiProperty({ description: 'Apellido del Usuario' })
  @IsNotEmpty()
  readonly lastName: string;

  @ApiProperty({
    description: 'Lugar de nacimiento del Usuario',
    required: false,
  })
  @IsOptional()
  readonly birthplace: string;

  @ApiProperty({ description: 'Foto del Usuario en Base 64' })
  @IsOptional()
  readonly photo: string;
}
export class UpdateUserDto extends PartialType(CreateUserDto) {}
