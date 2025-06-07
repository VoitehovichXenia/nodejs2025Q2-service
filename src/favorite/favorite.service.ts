import { forwardRef, Inject, Injectable } from '@nestjs/common';
import {
  CategoriesServices,
  Favorites,
  FavoritesCategories,
  PublicFavorites,
} from './favorite.const';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';

@Injectable()
export class FavoritesService {
  constructor(
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
  ) {}

  private _favs: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  private _categoryServices: CategoriesServices = {
    artists: 'artistService',
    albums: 'albumService',
    tracks: 'trackService',
  };

  public async getAll(): Promise<PublicFavorites> {
    const tracks = await this.trackService.getAll(this._favs.tracks);
    const albums = await this.albumService.getAll(this._favs.albums);
    const artists = await this.artistService.getAll(this._favs.artists);
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
    const isEntityInFavs = this._favs[category].includes(id);
    if (isEntityInFavs) return false;
    const serviceName = this._categoryServices[category];
    const entity = await this[serviceName].getById(id);
    if (!entity) return false;
    this._favs[category].push(id);
    return true;
  }

  private async _deleteEntity(
    id: string,
    category: FavoritesCategories,
  ): Promise<boolean> {
    const serviceName = this._categoryServices[category];
    const entity = await this[serviceName].getById(id);
    if (!entity) return false;
    this._favs[category] = this._favs[category].filter(
      (entityId) => entityId !== id,
    );
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
