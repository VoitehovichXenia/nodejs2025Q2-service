import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Artist } from '@prisma/client';
import { ArtistDto } from './artist.const';
// import { TrackService } from 'src/track/track.service';
import { FavoritesService } from 'src/favorite/favorite.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favouritesService: FavoritesService,
  ) {}

  private _artists = this.prisma.client.artist;

  public async getAll(ids?: string[]): Promise<Artist[]> {
    return await this._artists.findMany({
      where: {
        id: { in: ids },
      },
    });
  }

  public async getById(id: string): Promise<Artist | null> {
    return await this._artists.findUnique({
      where: { id },
    });
  }

  public async create(createArtistDto: ArtistDto): Promise<Artist> {
    return await this._artists.create({
      data: createArtistDto,
    });
  }

  public async delete(id: string): Promise<boolean> {
    const artist = await this.getById(id);
    if (!artist) return false;
    await this._artists.delete({
      where: { id },
    });
    this.favouritesService.deleteArtist(id);
    return true;
  }

  public async update({
    id,
    ...updateArtistDto
  }: Artist): Promise<Artist | null> {
    const artist = await this.getById(id);
    if (!artist) return null;
    const updatedArtist = await this._artists.update({
      where: { id },
      data: updateArtistDto,
    });
    return updatedArtist;
  }
}
