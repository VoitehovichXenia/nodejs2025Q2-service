import { Module } from '@nestjs/common';
import { UserConroller } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [UserConroller],
  providers: [UserService, PrismaService],
})
export class UserModule {}
