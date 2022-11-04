import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Persona } from '../entities/persona.entity';
import { UserRepository } from './userRepository.service';

@Module({
  imports: [TypeOrmModule.forFeature([Persona])],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class RepositoriesModule {}
