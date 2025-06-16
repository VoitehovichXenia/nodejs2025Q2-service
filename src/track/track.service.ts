import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Track } from '@prisma/client';
import { TrackDto } from './track.const';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { FavoritesService } from 'src/favorite/favorite.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}

  private _tracks = this.prisma.client.track;

  public async getAll(ids?: string[]): Promise<Track[]> {
    return await this._tracks.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  public async getById(id: string): Promise<Track | null> {
    return await this._tracks.findUnique({
      where: { id },
    });
  }

  public async create(createTrackDto: TrackDto): Promise<Track | null> {
    const { albumId, artistId } = createTrackDto;
    const album = albumId ? await this.albumService.getById(albumId) : true;
    const artist = artistId ? await this.artistService.getById(artistId) : true;
    if (!album || !artist) return null;
    return await this._tracks.create({
      data: createTrackDto,
    });
  }

  public async delete(id: string): Promise<boolean> {
    const track = await this.getById(id);
    if (!track) return false;
    await this._tracks.delete({
      where: { id },
    });
    this.favoritesService.deleteTrack(id);
    return true;
  }

  public async update(updateTrackDto: Track): Promise<Track | null> {
    const { id, albumId, artistId } = updateTrackDto;
    const track = await this.getById(id);
    if (!track) return null;
    const album = albumId ? this.albumService.getById(albumId) : true;
    const artist = artistId ? this.artistService.getById(artistId) : true;
    if (!album || !artist) return null;
    return await this._tracks.update({
      where: { id },
      data: updateTrackDto,
    });
  }
}
