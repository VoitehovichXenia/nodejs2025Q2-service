import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Track, TrackDto } from './track.const';
import { randomUUID } from 'node:crypto';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { FavoritesService } from 'src/favorite/favorite.service';

@Injectable()
export class TrackService {
  constructor(
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}
  private _tracks: Track[] = [];

  private _getAlbumTracks(albumId: string): Track[] {
    return this._tracks.filter((track) => track.albumId === albumId);
  }

  private _getArtistTracks(artistId: string): Track[] {
    return this._tracks.filter((track) => track.artistId === artistId);
  }

  public getAll(): Track[] {
    return this._tracks;
  }

  public getById(id: string): Track | null {
    return this._tracks.find((track) => track.id === id);
  }

  public create({ name, albumId, artistId, duration }: TrackDto): Track | null {
    const album = albumId ? this.albumService.getById(albumId) : true;
    const artist = artistId ? this.artistService.getById(artistId) : true;
    if (!album || !artist) return null;
    const newTrack = {
      id: randomUUID(),
      name,
      artistId: artistId ?? null,
      albumId: albumId ?? null,
      duration,
    };
    this._tracks.push(newTrack);
    return newTrack;
  }

  public delete(id: string): boolean {
    const track = this.getById(id);
    if (!track) return false;
    this.favoritesService.deleteTrack(id);
    this._tracks = this._tracks.filter((track) => track.id !== id);
    return true;
  }

  public deleteAlbumId(albumId: string) {
    const albumTracks = this._getAlbumTracks(albumId);
    albumTracks.forEach((track) => {
      track.albumId = null;
    });
  }

  public deleteArtistId(artistId: string) {
    const artistTracks = this._getArtistTracks(artistId);
    artistTracks.forEach((track) => {
      track.artistId = null;
    });
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
    const artist = artistId ? this.artistService.getById(artistId) : true;
    if (!album || !artist) return null;
    const trackIndex = this._tracks.findIndex((track) => track.id === id);
    const updatedUser = {
      id,
      albumId: albumId ?? null,
      artistId: artistId ?? null,
      name,
      duration,
    };
    this._tracks[trackIndex] = updatedUser;
    return updatedUser;
  }
}
