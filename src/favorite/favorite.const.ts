import { Album } from 'src/album/album.const';
import { Artist } from 'src/artist/artist.const';
import { Track } from 'src/track/track.const';
export interface Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}

export type PublicFavorites = {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
};

export type FavoritesCategories = keyof Favorites;

export type CategoriesServices = Record<FavoritesCategories, string>;
