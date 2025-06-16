import { forwardRef, Module } from '@nestjs/common';
import { FavoritesController } from './favorite.contoller';
import { FavoritesService } from './favorite.service';
import { TrackModule } from 'src/track/track.module';
import { AlbumModule } from 'src/album/album.module';
import { ArtistModule } from 'src/artist/artist.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    forwardRef(() => TrackModule),
    forwardRef(() => AlbumModule),
    forwardRef(() => ArtistModule),
    forwardRef(() => AuthModule),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService, PrismaService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
