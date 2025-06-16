import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Delete,
  Param,
  HttpCode,
  ParseUUIDPipe,
  BadRequestException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { Artist } from '@prisma/client';
import { ArtistDto } from './artist.const';
import { ArtistService } from './artist.service';
import { ContentTypeGuard } from 'src/common/guards/contentType.guard';
import { JWTAuthorizationGuard } from 'src/common/guards/authorization.guard';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @UseGuards(JWTAuthorizationGuard)
  @Get()
  async getAllArtists(): Promise<Artist[]> {
    return await this.artistService.getAll();
  }

  @UseGuards(JWTAuthorizationGuard)
  @Get(':id')
  async getArtist(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () =>
          new BadRequestException('Artist ID is not valid UUID'),
      }),
    )
    id: string,
  ): Promise<Artist> {
    const artist = await this.artistService.getById(id);
    if (!artist)
      throw new NotFoundException(`Artist with ID ${id} was not found`);
    return artist;
  }

  @UseGuards(JWTAuthorizationGuard, ContentTypeGuard)
  @Post()
  async createArtist(@Body() createArtistDto: ArtistDto): Promise<Artist> {
    return await this.artistService.create(createArtistDto);
  }

  @UseGuards(JWTAuthorizationGuard)
  @Delete(':id')
  @HttpCode(204)
  async deleteArtist(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () =>
          new BadRequestException('Artist ID is not valid UUID'),
      }),
    )
    id: string,
  ): Promise<void> {
    const isArtistDeleted = await this.artistService.delete(id);
    if (!isArtistDeleted)
      throw new NotFoundException(`Artist with ID ${id} was not found`);
  }

  @UseGuards(JWTAuthorizationGuard, ContentTypeGuard)
  @Put(':id')
  async updateArtist(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () =>
          new BadRequestException('Artist ID is not valid UUID'),
      }),
    )
    id: string,
    @Body() updateArtistDto: ArtistDto,
  ): Promise<Artist> {
    const updatedArtist = await this.artistService.update({
      ...updateArtistDto,
      id,
    });
    if (!updatedArtist)
      throw new NotFoundException(`Artist with ID ${id} was not found`);
    return updatedArtist;
  }
}
