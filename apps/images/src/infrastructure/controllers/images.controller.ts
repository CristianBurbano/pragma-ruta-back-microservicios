import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { addImageUseCases } from '../../usecases/addImage.usecases';
import { deleteImageUseCases } from '../../usecases/deleteImage.usecases';
import { getImagesUseCases } from '../../usecases/getImage.usecases';
import { updateImageUseCases } from '../../usecases/updateImage.usecases';

@ApiTags('Imagenes')
@Controller('images')
export class ImagesController {
  @ApiOperation({ summary: 'Obtener las imagenes' })
  @MessagePattern({ cmd: 'getImages' })
  getImages() {
    return this.getImgUseCases.exec();
  }

  @ApiOperation({ summary: 'Crear una imagen' })
  @MessagePattern({ cmd: 'uploadImage' })
  createImage(file: any) {
    console.log(file);
    return this.addImgUseCases.execute(file);
  }

  @ApiOperation({ summary: 'Obtener una imagen por su ID' })
  @MessagePattern({ cmd: 'getImage' })
  findOne(id: string) {
    return this.getImgUseCases.byId(id);
  }

  @ApiOperation({ summary: 'Modificar propiedades de la imagen por su ID' })
  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  updateImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.updateImgUseCases.exec(id, file);
  }

  @ApiOperation({ summary: 'Eliminar Imagen' })
  @MessagePattern({ cmd: 'deleteImage' })
  deleteImage(id: string) {
    return this.deleteImgUseCases.exec(id);
  }

  constructor(
    private addImgUseCases: addImageUseCases,
    private updateImgUseCases: updateImageUseCases,
    private deleteImgUseCases: deleteImageUseCases,
    private getImgUseCases: getImagesUseCases,
  ) {}
}
