import { forwardRef, Module } from '@nestjs/common';
import { FavoritesController } from './favorite.contoller';
import { FavoritesService } from './favorite.service';
import { TrackModule } from 'src/track/track.module';
import { AlbumModule } from 'src/album/album.module';
import { ArtistModule } from 'src/artist/artist.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    forwardRef(() => TrackModule),
    forwardRef(() => AlbumModule),
    forwardRef(() => ArtistModule),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService, PrismaService, JwtService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
