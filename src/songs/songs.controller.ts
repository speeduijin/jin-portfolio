import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { IsPublic } from 'src/common/decorator/is-public.decorator';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get('chart')
  @IsPublic()
  async getSongsChart() {
    return await this.songsService.getChart();
  }

  @Patch(':id/increase-playcount')
  @IsPublic()
  async patchPlayCount(@Param('id', ParseIntPipe) id: number) {
    return await this.songsService.increasePlayCount(id);
  }

  // @Patch('playcount')
  // @IsPublic()
  // async patchSongsPlayCount() {
  //   return await this.songsService.patchPlayCount();
  // }

  // @Post('youtube')
  // @IsPublic()
  // async postSongsYoutube() {
  //   return await this.songsService.postYoutubeMusicChart();
  // }
}
