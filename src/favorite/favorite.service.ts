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
    const tracks = this._favs.tracks.map((trackId) => {
      return this.trackService.getById(trackId);
    });
    const albums = this._favs.albums.map((albumId) => {
      return this.albumService.getById(albumId);
    });
    const artists = await Promise.all(
      this._favs.artists.map((artistId) => {
        return this.artistService.getById(artistId);
      }),
    );
    return {
      tracks,
      albums,
      artists,
    };
  }

  private _addEntity(id: string, category: FavoritesCategories): boolean {
    const isEntityInFavs = this._favs[category].includes(id);
    if (isEntityInFavs) return false;
    const serviceName = this._categoryServices[category];
    const entity = this[serviceName].getById(id);
    if (!entity) return false;
    this._favs[category].push(id);
    return true;
  }

  private _deleteEntity(id: string, category: FavoritesCategories): boolean {
    const serviceName = this._categoryServices[category];
    const entity = this[serviceName].getById(id);
    if (!entity) return false;
    this._favs[category] = this._favs[category].filter(
      (entityId) => entityId !== id,
    );
    return true;
  }

  public addTrack(id: string): boolean {
    return this._addEntity(id, 'tracks');
  }

  public deleteTrack(id: string): boolean {
    return this._deleteEntity(id, 'tracks');
  }

  public addAlbum(id: string): boolean {
    return this._addEntity(id, 'albums');
  }

  public deleteAlbum(id: string): boolean {
    return this._deleteEntity(id, 'albums');
  }

  public addArtist(id: string): boolean {
    return this._addEntity(id, 'artists');
  }

  public deleteArtist(id: string): boolean {
    return this._deleteEntity(id, 'artists');
  }
}
