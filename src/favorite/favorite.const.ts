import { PublicAlbum } from 'src/album/album.const';
import { PublicArtist } from 'src/artist/artist.const';
import { PublicTrack } from 'src/track/track.const';

export interface Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}

export interface PublicFavorites {
  artists: PublicArtist[];
  albums: PublicAlbum[];
  tracks: PublicTrack[];
}
