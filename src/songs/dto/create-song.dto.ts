import { SongsModel } from '../entity/songs.entity';
import { PickType } from '@nestjs/mapped-types';

export class CreateSongDto extends PickType(SongsModel, [
  'title',
  'artist',
  'youtubeVideoId',
]) {}
