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
import { TrackService } from './track.service';
import { Track } from '@prisma/client';
import { TrackDto } from './track.const';
import { ContentTypeGuard } from 'src/common/guards/contentType.guard';
import { JWTAuthorizationGuard } from 'src/common/guards/authorization.guard';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @UseGuards(JWTAuthorizationGuard)
  @Get()
  async getAllTracks(): Promise<Track[]> {
    return this.trackService.getAll();
  }

  @UseGuards(JWTAuthorizationGuard)
  @Get(':id')
  async getTrack(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () =>
          new BadRequestException('Track ID is not a valid UUID'),
      }),
    )
    id: string,
  ): Promise<Track> {
    const track = await this.trackService.getById(id);
    if (!track)
      throw new NotFoundException(`Track with ID ${id} was not found`);
    return track;
  }

  @UseGuards(JWTAuthorizationGuard, ContentTypeGuard)
  @Post()
  async createTrack(@Body() createTrackDto: TrackDto): Promise<Track> {
    const newTrack = await this.trackService.create(createTrackDto);
    if (!newTrack)
      throw new NotFoundException(
        `Check artistId and albumId, there no artists or albums with such ids`,
      );
    return newTrack;
  }

  @UseGuards(JWTAuthorizationGuard)
  @Delete(':id')
  @HttpCode(204)
  async deleteTrack(
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
    const isTrackDeleted = await this.trackService.delete(id);
    if (!isTrackDeleted)
      throw new NotFoundException(`Track with ID ${id} was not found`);
  }

  @UseGuards(JWTAuthorizationGuard, ContentTypeGuard)
  @Put(':id')
  async updateTrack(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () =>
          new BadRequestException('Track ID is not a valid UUID'),
      }),
    )
    id: string,
    @Body() updateTrackDto: TrackDto,
  ): Promise<Track> {
    const updatedTrack = await this.trackService.update({
      ...updateTrackDto,
      id,
    });
    if (!updatedTrack)
      throw new NotFoundException(
        `Check artistId and albumId, there no artists or albums with such ids`,
      );
    return updatedTrack;
  }
}
