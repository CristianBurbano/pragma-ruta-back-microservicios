import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { getUsersUseCases } from '../../usecases/getUsers.usecases';
import { consultUserUseCases } from '../../usecases/consultUser.usecases';
import { deleteUserUseCases } from '../../usecases/deleteUser.usecases';
import { updateUserUseCases } from '../../usecases/updateUser.usecases';
import { addUserUseCases } from '../../usecases/addUser.usecases';

@ApiTags('Usuarios')
@Controller('users')
export class UsersController {
  @ApiOperation({ summary: 'Consulta de los Usuarios' })
  @Get()
  getUsers(
    @Query('type') type?: number,
    @Query('document') document?: string,
    @Query('minAge') minAge?: number,
    @Query('maxAge') maxAge?: number,
  ) {
    if (!isNaN(type) && type != null && document) {
      return this.getUserUseCase.byDocument(type, document);
    } else {
      if (document) {
        return this.getUsersUseCase.getByDocument(document);
      } else {
        if (maxAge || minAge) {
          return this.getUsersUseCase.getByAge(minAge, maxAge);
        } else return this.getUsersUseCase.execute();
      }
    }
  }

  @ApiOperation({ summary: 'Crear Usuario' })
  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  createUser(
    @Body() payload: CreateUserDto,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    console.log('payload', payload);
    return this.createUserUseCase.execute({ ...payload, photo });
  }

  @ApiOperation({ summary: 'Obtener Usuario por Id' })
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.getUserUseCase.byId(id);
  }

  @ApiOperation({ summary: 'Modificar propiedades del usuario' })
  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ) {
    await this.updateUserUseCase.exec(id, payload);
    return 'success';
  }

  @ApiOperation({ summary: 'Eliminar Usuario' })
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id) {
    await this.deleteUserUseCase.exec(id);
    return 'success';
  }

  constructor(
    private getUserUseCase: consultUserUseCases,
    private getUsersUseCase: getUsersUseCases,
    private updateUserUseCase: updateUserUseCases,
    private deleteUserUseCase: deleteUserUseCases,
    private createUserUseCase: addUserUseCases,
  ) {}
}
