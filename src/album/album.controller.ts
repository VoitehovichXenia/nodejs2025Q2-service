import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  ParseUUIDPipe,
  BadRequestException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { Album } from '@prisma/client';
import { AlbumDto } from './album.const';
import { AlbumService } from './album.service';
import { CheckHeaders } from 'src/common/guards/headers.guard';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  async getAllAlbums(): Promise<Album[]> {
    return await this.albumService.getAll();
  }

  @Get(':id')
  async getAlbum(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () =>
          new BadRequestException('Album ID is not valid UUID'),
      }),
    )
    id: string,
  ): Promise<Album> {
    const album = await this.albumService.getById(id);
    if (!album)
      throw new NotFoundException(`Album with ID ${id} was not found`);
    return album;
  }

  @UseGuards(CheckHeaders)
  @Post()
  async createAlbum(@Body() createAlbumDto: AlbumDto): Promise<Album> {
    const newAlbum = await this.albumService.create(createAlbumDto);
    if (!newAlbum)
      throw new NotFoundException(
        `Artist with artistId ${createAlbumDto.artistId} doesn't exist`,
      );
    return newAlbum;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteAlbum(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () =>
          new BadRequestException('Album ID is not valid UUID'),
      }),
    )
    id: string,
  ): Promise<void> {
    const isAlbumDeleted = await this.albumService.delete(id);
    if (!isAlbumDeleted)
      throw new NotFoundException(`Album with ID ${id} was not found`);
  }

  @UseGuards(CheckHeaders)
  @Put(':id')
  async updateAlbum(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () =>
          new BadRequestException('Album ID is not valid UUID'),
      }),
    )
    id: string,
    @Body() updateAlbumDto: AlbumDto,
  ): Promise<Album> {
    const updatedAlbum = await this.albumService.update({
      ...updateAlbumDto,
      id,
    });
    if (!updatedAlbum)
      throw new NotFoundException(
        `Album with ID ${id} and with artis ID ${updateAlbumDto.artistId} was not found`,
      );
    return updatedAlbum;
  }
}
