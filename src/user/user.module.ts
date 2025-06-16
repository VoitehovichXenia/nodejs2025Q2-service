import { forwardRef, Module } from '@nestjs/common';
import { UserConroller } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [UserConroller],
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
