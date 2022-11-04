import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateImageDto {
  @ApiProperty({ description: 'archivo a guardar' })
  @IsNotEmpty()
  readonly file: Express.Multer.File;
}

export class UpdateImageDto extends PartialType(CreateImageDto) {}
