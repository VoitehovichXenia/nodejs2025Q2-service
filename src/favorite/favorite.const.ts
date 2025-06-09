import { Album } from '@prisma/client';
import { Artist } from '@prisma/client';
import { Track } from '@prisma/client';
import { Favorites as PrismaFavorites } from '@prisma/client';

export type Favorites = Omit<PrismaFavorites, 'id'>;

export type PublicFavorites = {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
};

export type FavoritesCategories = keyof Favorites;

export type CategoriesServices = Record<FavoritesCategories, string>;
