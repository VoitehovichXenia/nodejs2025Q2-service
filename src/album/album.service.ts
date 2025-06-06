import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Album } from '@prisma/client';
import { AlbumDto } from './album.const';
import { ArtistService } from 'src/artist/artist.service';
import { TrackService } from 'src/track/track.service';
import { FavoritesService } from 'src/favorite/favorite.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favouritesService: FavoritesService,
  ) {}

  private _albums: Album[] = [];

  private _getArtistsAlbums(artistId: string): Album[] {
    return this._albums.filter((album) => album.artistId === artistId);
  }

  public async getAll(): Promise<Album[]> {
    return await this.prisma.client.album.findMany();
  }

  public async getById(id: string): Promise<Album> {
    return this.prisma.client.album.findUnique({
      where: { id },
    });
  }

  public async create(createAlbumDto: AlbumDto): Promise<Album | null> {
    const { artistId } = createAlbumDto;
    const artist = artistId
      ? await this.prisma.client.artist.findUnique({
          where: { id: artistId },
        })
      : true;
    if (!artist) return null;
    return await this.prisma.client.album.create({
      data: createAlbumDto,
    });
  }

  public async delete(id: string): Promise<boolean> {
    const album = await this.prisma.client.album.findUnique({
      where: { id },
    });
    if (!album) return false;
    await this.prisma.client.album.delete({
      where: { id },
    });
    this.trackService.deleteAlbumId(id);
    this.favouritesService.deleteAlbum(id);
    return true;
  }

  public deleteArtistId(artistId: string): boolean {
    const artistAlbums = this._getArtistsAlbums(artistId);
    artistAlbums.forEach((album) => {
      album.artistId = null;
    });
    return true;
  }

  public async update(updateAlbumDto: Album): Promise<Album | null> {
    const { id, artistId } = updateAlbumDto;
    const artist = artistId
      ? this.prisma.client.artist.findUnique({
          where: { id: artistId },
        })
      : true;
    const album = await this.prisma.client.album.findUnique({
      where: { id },
    });
    if (!artist || !album) return null;
    return await this.prisma.client.album.update({
      where: { id },
      data: updateAlbumDto,
    });
  }
}
