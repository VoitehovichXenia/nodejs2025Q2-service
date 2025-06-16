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
  UseGuards,
} from '@nestjs/common';
import { FavoritesService } from './favorite.service';
import { PublicFavorites } from './favorite.const';
import { JWTAuthorizationGuard } from 'src/common/guards/authorization.guard';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @UseGuards(JWTAuthorizationGuard)
  @Get()
  async getAllFavorites(): Promise<PublicFavorites> {
    return await this.favoritesService.getAll();
  }

  @UseGuards(JWTAuthorizationGuard)
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

  @UseGuards(JWTAuthorizationGuard)
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

  @UseGuards(JWTAuthorizationGuard)
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

  @UseGuards(JWTAuthorizationGuard)
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

  @UseGuards(JWTAuthorizationGuard)
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

  @UseGuards(JWTAuthorizationGuard)
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
