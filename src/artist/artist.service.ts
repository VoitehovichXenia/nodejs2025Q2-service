import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Artist } from '@prisma/client';
import { ArtistDto } from './artist.const';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';
import { FavoritesService } from 'src/favorite/favorite.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favouritesService: FavoritesService,
  ) {}

  public async getAll(): Promise<Artist[]> {
    return await this.prisma.client.artist.findMany();
  }

  public async getById(id: string): Promise<Artist | null> {
    return await this.prisma.client.artist.findUnique({
      where: { id },
    });
  }

  public async create(createArtistDto: ArtistDto): Promise<Artist> {
    return await this.prisma.client.artist.create({
      data: createArtistDto,
    });
  }

  public async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.client.artist.delete({
        where: { id },
      });
      this.albumService.deleteArtistId(id);
      this.trackService.deleteArtistId(id);
      this.favouritesService.deleteArtist(id);
      return true;
    } catch {
      return false;
    }
  }

  public async update({
    id,
    ...updateArtistDto
  }: Artist): Promise<Artist | null> {
    const updatedArtist = await this.prisma.client.artist.update({
      where: { id },
      data: updateArtistDto,
    });
    if (!updatedArtist) return null;
    return updatedArtist;
  }
}
