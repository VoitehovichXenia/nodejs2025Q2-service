import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Favorites as PrismaFavorites } from '@prisma/client';
import {
  CategoriesServices,
  Favorites,
  FavoritesCategories,
  PublicFavorites,
} from './favorite.const';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
  ) {}

  // TODO: remove in the next part of the task
  private _favsId = '8c9fb9b6-c1bb-4ade-a52a-882950926b8b';

  private _categoryServices: CategoriesServices = {
    artists: 'artistService',
    albums: 'albumService',
    tracks: 'trackService',
  };

  private async _createFavs(): Promise<PrismaFavorites> {
    return await this.prisma.client.favorites.create({
      data: {
        id: this._favsId,
        artists: [],
        albums: [],
        tracks: [],
      },
    });
  }

  private async _getFavsFromDB(): Promise<Favorites | null> {
    return await this.prisma.client.favorites.findUnique({
      where: { id: this._favsId },
      omit: { id: true },
    });
  }

  private async _getFavs(): Promise<Favorites> {
    let favorites = await this._getFavsFromDB();
    if (!favorites) {
      await this._createFavs();
      favorites = await this._getFavsFromDB();
    }
    return favorites;
  }

  public async getAll(): Promise<PublicFavorites> {
    const favorites = await this._getFavs();
    const tracks = await this.trackService.getAll(favorites.tracks);
    const albums = await this.albumService.getAll(favorites.albums);
    const artists = await this.artistService.getAll(favorites.artists);
    return {
      tracks,
      albums,
      artists,
    };
  }

  private async _addEntity(
    id: string,
    category: FavoritesCategories,
  ): Promise<boolean> {
    const favorites = await this._getFavs();
    const isEntityInFavs = favorites[category].includes(id);
    if (isEntityInFavs) return false;
    const serviceName = this._categoryServices[category];
    const entity = await this[serviceName].getById(id);
    if (!entity) return false;
    await this.prisma.client.favorites.update({
      where: { id: this._favsId },
      data: {
        [category]: {
          push: id,
        },
      },
    });
    return true;
  }

  private async _deleteEntity(
    id: string,
    category: FavoritesCategories,
  ): Promise<boolean> {
    const serviceName = this._categoryServices[category];
    const entity = await this[serviceName].getById(id);
    if (!entity) return false;
    const favorites = await this._getFavs();
    await this.prisma.client.favorites.update({
      where: { id: this._favsId },
      data: {
        [category]: favorites[category].filter((entityId) => entityId !== id),
      },
    });
    return true;
  }

  public async addTrack(id: string): Promise<boolean> {
    return await this._addEntity(id, 'tracks');
  }

  public async deleteTrack(id: string): Promise<boolean> {
    return await this._deleteEntity(id, 'tracks');
  }

  public async addAlbum(id: string): Promise<boolean> {
    return await this._addEntity(id, 'albums');
  }

  public async deleteAlbum(id: string): Promise<boolean> {
    return await this._deleteEntity(id, 'albums');
  }

  public async addArtist(id: string): Promise<boolean> {
    return await this._addEntity(id, 'artists');
  }

  public async deleteArtist(id: string): Promise<boolean> {
    return await this._deleteEntity(id, 'artists');
  }
}
