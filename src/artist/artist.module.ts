import { forwardRef, Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { FavoritesModule } from 'src/favorite/favorite.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [forwardRef(() => FavoritesModule), forwardRef(() => AuthModule)],
  controllers: [ArtistController],
  providers: [ArtistService, PrismaService, JwtService],
  exports: [ArtistService],
})
export class ArtistModule {}
