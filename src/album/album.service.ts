import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Album, AlbumDto } from './album.const';
import { ArtistService } from 'src/artist/artist.service';
import { TrackService } from 'src/track/track.service';
import { FavoritesService } from 'src/favorite/favorite.service';
import { generateUUID } from 'src/common/utils/generateUUID';

@Injectable()
export class AlbumService {
  constructor(
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

  public getAll(): Album[] {
    return this._albums;
  }

  public getById(id: string): Album {
    return this._albums.find((album) => album.id === id);
  }

  public create(createAlbumDto: AlbumDto): Album | null {
    const { artistId } = createAlbumDto;
    const artist = artistId ? this.artistService.getById(artistId) : true;
    if (!artist) return null;
    const id = generateUUID(this._albums);
    const newAlbum = { ...createAlbumDto, id };
    this._albums.push(newAlbum);
    return newAlbum;
  }

  public delete(id: string): boolean {
    const album = this.getById(id);
    if (!album) return false;
    this.trackService.deleteAlbumId(id);
    this.favouritesService.deleteAlbum(id);
    this._albums = this._albums.filter((album) => album.id !== id);
    return true;
  }

  public deleteArtistId(artistId: string): boolean {
    const artistAlbums = this._getArtistsAlbums(artistId);
    artistAlbums.forEach((album) => {
      album.artistId = null;
    });
    return true;
  }

  public update(updateAlbumDto: Album): Album | null {
    const { id, artistId } = updateAlbumDto;
    const artist = artistId ? this.artistService.getById(artistId) : true;
    const albumIndex = this._albums.findIndex((album) => album.id === id);
    if (albumIndex === -1 || !artist) return null;
    const updatedAlbum = {
      ...updateAlbumDto,
      artistId: artistId ?? null,
    };
    this._albums[albumIndex] = updatedAlbum;
    return updatedAlbum;
  }
}
