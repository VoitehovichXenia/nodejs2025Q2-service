import { Album } from '@prisma/client';
import { Artist } from '@prisma/client';
import { Track } from '@prisma/client';
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
