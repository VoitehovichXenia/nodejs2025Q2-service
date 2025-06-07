import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Album } from '@prisma/client';
import { AlbumDto } from './album.const';
import { ArtistService } from 'src/artist/artist.service';
// import { TrackService } from 'src/track/track.service';
import { FavoritesService } from 'src/favorite/favorite.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
    // @Inject(forwardRef(() => TrackService))
    // private readonly trackService: TrackService,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favouritesService: FavoritesService,
  ) {}

  private _albums = this.prisma.client.album;

  public async getAll(): Promise<Album[]> {
    return await this._albums.findMany();
  }

  public async getById(id: string): Promise<Album> {
    return this._albums.findUnique({
      where: { id },
    });
  }

  public async create(createAlbumDto: AlbumDto): Promise<Album | null> {
    const { artistId } = createAlbumDto;
    const artist = artistId ? await this.artistService.getById(artistId) : true;
    if (!artist) return null;
    return await this._albums.create({
      data: createAlbumDto,
    });
  }

  public async delete(id: string): Promise<boolean> {
    const album = await this.getById(id);
    if (!album) return false;
    await this._albums.delete({
      where: { id },
    });
    this.favouritesService.deleteAlbum(id);
    return true;
  }

  public async update(updateAlbumDto: Album): Promise<Album | null> {
    const { id, artistId } = updateAlbumDto;
    const artist = artistId ? await this.artistService.getById(artistId) : true;
    const album = await this.getById(id);
    if (!artist || !album) return null;
    return await this._albums.update({
      where: { id },
      data: updateAlbumDto,
    });
  }
}
