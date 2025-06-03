import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Track, TrackDto } from './track.const';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { FavoritesService } from 'src/favorite/favorite.service';
import { generateUUID } from 'src/common/utils/generateUUID';

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

  public create(createTrackDto: TrackDto): Track | null {
    const { albumId, artistId } = createTrackDto;
    const album = albumId ? this.albumService.getById(albumId) : true;
    const artist = artistId ? this.artistService.getById(artistId) : true;
    if (!album || !artist) return null;
    const id = generateUUID(this._tracks);
    const newTrack = { ...createTrackDto, id };
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

  public update(updateTrackDto: Track): Track | null {
    const { id, albumId, artistId } = updateTrackDto;
    const album = albumId ? this.albumService.getById(albumId) : true;
    const artist = artistId ? this.artistService.getById(artistId) : true;
    if (!album || !artist) return null;
    const trackIndex = this._tracks.findIndex((track) => track.id === id);
    if (trackIndex === -1) return null;
    const updatedUser = {
      ...updateTrackDto,
      albumId: albumId ?? null,
      artistId: artistId ?? null,
    };
    this._tracks[trackIndex] = updatedUser;
    return updatedUser;
  }
}
