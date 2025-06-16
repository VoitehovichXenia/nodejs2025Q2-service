import { forwardRef, Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { FavoritesModule } from 'src/favorite/favorite.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [forwardRef(() => FavoritesModule)],
  controllers: [ArtistController],
  providers: [ArtistService, PrismaService, JwtService],
  exports: [ArtistService],
})
export class ArtistModule {}
