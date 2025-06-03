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
import { Artist, ArtistDto } from './artist.const';
import { ArtistService } from './artist.service';
import { CheckHeaders } from 'src/common/guards/headers.guard';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  getAllArtists(): Artist[] {
    return this.artistService.getAll();
  }

  @Get(':id')
  getArtist(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () =>
          new BadRequestException('Artist ID is not valid UUID'),
      }),
    )
    id: string,
  ): Artist {
    const artist = this.artistService.getById(id);
    if (!artist)
      throw new NotFoundException(`Artist with ID ${id} was not found`);
    return artist;
  }

  @UseGuards(CheckHeaders)
  @Post()
  createArtist(@Body() createArtistDto: ArtistDto): Artist {
    return this.artistService.create(createArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteArtist(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () =>
          new BadRequestException('Artist ID is not valid UUID'),
      }),
    )
    id: string,
  ): void {
    const isArtistDeleted = this.artistService.delete(id);
    if (!isArtistDeleted)
      throw new NotFoundException(`Artist with ID ${id} was not found`);
  }

  @UseGuards(CheckHeaders)
  @Put(':id')
  updateArtist(
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
  ) {
    const updatedArtist = this.artistService.update({ ...updateArtistDto, id });
    if (!updatedArtist)
      throw new NotFoundException(`Artist with ID ${id} was not found`);
    return updatedArtist;
  }
}
