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
  @Get()
  getImages() {
    return this.getImgUseCases.exec();
  }

  @ApiOperation({ summary: 'Crear una imagen' })
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  createImage(@UploadedFile() file: Express.Multer.File) {
    return this.addImgUseCases.execute(file);
  }

  @ApiOperation({ summary: 'Obtener una imagen por su ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
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
  @Delete(':id')
  deleteImage(@Param('id') id: string) {
    return this.deleteImgUseCases.exec(id);
  }

  constructor(
    private addImgUseCases: addImageUseCases,
    private updateImgUseCases: updateImageUseCases,
    private deleteImgUseCases: deleteImageUseCases,
    private getImgUseCases: getImagesUseCases,
  ) {}
}
