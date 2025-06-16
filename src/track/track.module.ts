import { forwardRef, Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { AlbumModule } from 'src/album/album.module';
import { ArtistModule } from 'src/artist/artist.module';
import { FavoritesModule } from 'src/favorite/favorite.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    forwardRef(() => AlbumModule),
    forwardRef(() => ArtistModule),
    forwardRef(() => FavoritesModule),
    forwardRef(() => AuthModule),
  ],
  controllers: [TrackController],
  providers: [TrackService, PrismaService],
  exports: [TrackService],
})
export class TrackModule {}
