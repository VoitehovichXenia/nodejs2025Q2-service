import { forwardRef, Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { AlbumModule } from 'src/album/album.module';
import { ArtistModule } from 'src/artist/artist.module';

@Module({
  imports: [forwardRef(() => AlbumModule), forwardRef(() => ArtistModule)],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
