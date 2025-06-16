import { Module } from '@nestjs/common';
import { UserConroller } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [],
  controllers: [UserConroller],
  providers: [UserService, PrismaService, JwtService],
})
export class UserModule {}
