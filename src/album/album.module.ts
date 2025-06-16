import { forwardRef, Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { ArtistModule } from 'src/artist/artist.module';
import { FavoritesModule } from 'src/favorite/favorite.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [forwardRef(() => ArtistModule), forwardRef(() => FavoritesModule)],
  controllers: [AlbumController],
  providers: [AlbumService, PrismaService, JwtService],
  exports: [AlbumService],
})
export class AlbumModule {}
