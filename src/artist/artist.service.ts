import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Artist, ArtistDto } from './artist.const';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';
import { FavoritesService } from 'src/favorite/favorite.service';
import { generateUUID } from 'src/common/utils/generateUUID';

@Injectable()
export class ArtistService {
  constructor(
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favouritesService: FavoritesService,
  ) {}

  private _artists: Artist[] = [];

  public getAll(): Artist[] {
    return this._artists;
  }

  public getById(id: string): Artist | null {
    return this._artists.find((artist) => artist.id === id);
  }

  public create(createArtistDto: ArtistDto): Artist {
    const id = generateUUID(this._artists);
    const newArtist = { ...createArtistDto, id };
    this._artists.push(newArtist);
    return newArtist;
  }

  public delete(id: string): boolean {
    const artist = this.getById(id);
    if (!artist) return false;
    this.albumService.deleteArtistId(id);
    this.trackService.deleteArtistId(id);
    this.favouritesService.deleteArtist(id);
    this._artists = this._artists.filter((artist) => artist.id !== id);
    return true;
  }

  public update({ id, ...updateArtistDto }: Artist): Artist | null {
    const artistIndex = this._artists.findIndex((artist) => artist.id === id);
    if (artistIndex === -1) return null;
    const updatedArtist = { id, ...updateArtistDto };
    this._artists[artistIndex] = updatedArtist;
    return updatedArtist;
  }
}
