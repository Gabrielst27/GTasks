import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SharedModule } from 'src/modules/shared/shared.module';
import { PrismaService } from 'src/modules/shared/prisma/prisma.service';

@Module({
  imports: [SharedModule],
  providers: [PrismaService, UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
