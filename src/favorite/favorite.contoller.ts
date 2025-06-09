import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoritesService } from './favorite.service';
import { PublicFavorites } from './favorite.const';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async getAllFavorites(): Promise<PublicFavorites> {
    return await this.favoritesService.getAll();
  }

  @Post('/track/:id')
  async addTrackToFavs(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () =>
          new BadRequestException('Track ID is not a valid UUID'),
      }),
    )
    id: string,
  ): Promise<void> {
    const isTrackAddedToFavs = await this.favoritesService.addTrack(id);
    if (!isTrackAddedToFavs)
      throw new UnprocessableEntityException(
        `Track with ID ${id} was not found`,
      );
  }

  @Delete('/track/:id')
  @HttpCode(204)
  async deleteTrackFromFavs(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () =>
          new BadRequestException('Track ID is not a valid UUID'),
      }),
    )
    id: string,
  ): Promise<void> {
    const isTrackDeletedFromFavs = await this.favoritesService.deleteTrack(id);
    if (!isTrackDeletedFromFavs)
      throw new NotFoundException(
        `Track with ID ${id} was not added to favorites`,
      );
  }

  @Post('/album/:id')
  async addAlbumToFavs(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () =>
          new BadRequestException('Album ID is not a valid UUID'),
      }),
    )
    id: string,
  ): Promise<void> {
    const isAlbumAddedToFavs = await this.favoritesService.addAlbum(id);
    if (!isAlbumAddedToFavs)
      throw new UnprocessableEntityException(
        `Album with ID ${id} was not found`,
      );
  }

  @Delete('/album/:id')
  @HttpCode(204)
  async deleteAlbumFromFavs(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () =>
          new BadRequestException('Album ID is not a valid UUID'),
      }),
    )
    id: string,
  ): Promise<void> {
    const isAlbumDeletedFromFavs = await this.favoritesService.deleteAlbum(id);
    if (!isAlbumDeletedFromFavs)
      throw new NotFoundException(
        `Album with ID ${id} was not added to favorites`,
      );
  }

  @Post('/artist/:id')
  async addArtistToFavs(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () =>
          new BadRequestException('Artist ID is not a valid UUID'),
      }),
    )
    id: string,
  ): Promise<void> {
    const isArtistAddedToFavs = await this.favoritesService.addArtist(id);
    if (!isArtistAddedToFavs)
      throw new UnprocessableEntityException(
        `Artist with ID ${id} was not found`,
      );
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  async deleteArtistFromFavs(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () =>
          new BadRequestException('Artist ID is not a valid UUID'),
      }),
    )
    id: string,
  ): Promise<void> {
    const isArtistDeletedFromFavs =
      await this.favoritesService.deleteArtist(id);
    if (!isArtistDeletedFromFavs)
      throw new NotFoundException(
        `Artist with ID ${id} was not added to favorites`,
      );
  }
}
