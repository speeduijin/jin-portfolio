import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { SongsService } from './songs.service';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get('chart')
  async getSongsChart() {
    return await this.songsService.getChart();
  }

  @Patch(':id/increase-playcount')
  async patchPlayCount(@Param('id', ParseIntPipe) id: number) {
    return await this.songsService.increasePlayCount(id);
  }

  // @Patch('playcount')
  // async patchSongsPlayCount() {
  //   return await this.songsService.patchPlayCount();
  // }

  // @Post('youtube')
  // async postSongsYoutube() {
  //   return await this.songsService.postYoutubeMusicChart();
  // }
}
