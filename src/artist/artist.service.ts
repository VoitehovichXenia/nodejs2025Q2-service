import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Artist, ArtistDto } from './artist.const';

@Injectable()
export class ArtistService {
  private _artists: Artist[] = [];

  public getAll(): Artist[] {
    return this._artists;
  }

  public getById(id: string): Artist | null {
    return this._artists.find((artist) => artist.id === id);
  }

  public create({ name, grammy }: ArtistDto): Artist {
    const newArtist = {
      id: randomUUID(),
      name,
      grammy,
    };
    this._artists.push(newArtist);
    return newArtist;
  }

  public delete(id: string): boolean {
    const artist = this.getById(id);
    if (!artist) return false;
    this._artists = this._artists.filter((artist) => artist.id !== id);
    return true;
  }

  public update({ id, name, grammy }: Artist): Artist | null {
    const artist = this.getById(id);
    if (!artist) return null;
    const artistIndex = this._artists.findIndex((artist) => artist.id === id);
    const updatedArtist = {
      id,
      name,
      grammy,
    };
    this._artists[artistIndex] = updatedArtist;
    return updatedArtist;
  }
}
