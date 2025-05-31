import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Track, TrackDto } from './track.const';
import { randomUUID } from 'node:crypto';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';

@Injectable()
export class TrackService {
  constructor(
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
  ) {}
  private _tracks: Track[] = [];

  public getAll(): Track[] {
    return this._tracks;
  }

  public getById(id: string): Track | null {
    return this._tracks.find((track) => track.id === id);
  }

  public create({ name, albumId, artistId, duration }: TrackDto): Track | null {
    const album = albumId ? this.albumService.getById(albumId) : true;
    const artist = artistId ? this.albumService.getById(artistId) : true;
    if (!album || !artist) return null;
    const newTrack = {
      id: randomUUID(),
      name,
      artistId,
      albumId,
      duration,
    };
    this._tracks.push(newTrack);
    return newTrack;
  }

  public delete(id: string): boolean {
    const track = this.getById(id);
    if (!track) return false;
    this._tracks = this._tracks.filter((track) => track.id !== id);
    return true;
  }

  public update({
    id,
    albumId,
    artistId,
    name,
    duration,
  }: Track): Track | null {
    const track = this.getById(id);
    if (!track) return null;
    const album = albumId ? this.albumService.getById(albumId) : true;
    const artist = artistId ? this.albumService.getById(artistId) : true;
    if (!album || !artist) return null;
    const trackIndex = this._tracks.findIndex((track) => track.id === id);
    const updatedUser = {
      id,
      albumId,
      artistId,
      name,
      duration,
    };
    this._tracks[trackIndex] = updatedUser;
    return updatedUser;
  }
}
