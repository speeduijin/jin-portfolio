import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import axios from 'axios';
import { each, flat, map, pipe, range, toArray, toAsync } from '@fxts/core';
import { SongsModel } from './entity/songs.entity';
import { CreateSongDto } from './dto/create-song.dto';
import { ENV_YOUTUBE_API_KEY } from 'src/common/const/env-keys.const';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(SongsModel)
    private readonly songsRepository: Repository<SongsModel>,
    private readonly configService: ConfigService,
  ) {}

  async getChart() {
    return await this.songsRepository.find({ order: { playCount: 'DESC' } });
  }

  async increasePlayCount(songId: number) {
    const song = await this.songsRepository.findOne({ where: { id: songId } });

    if (!song) throw new NotFoundException();

    song.playCount += 1;

    const updateSong = await this.songsRepository.save(song);

    return updateSong;
  }

  async createSong(songDto?: CreateSongDto) {
    const song = this.songsRepository.create({
      ...songDto,
    });

    const newSong = await this.songsRepository.save(song);

    return newSong;
  }

  async patchPlayCount() {
    await pipe(
      range(100),
      toAsync,
      map((id) => this.songsRepository.findOne({ where: { id: id + 1 } })),
      map((song) => {
        return { ...song, playCount: 1000 - song.id * 10 };
      }),
      each((song) => this.songsRepository.save(song)),
    );

    return true;
  }

  async postYoutubeMusicChart() {
    const apiKey = this.configService.get<string>(ENV_YOUTUBE_API_KEY);
    const apiUrl = 'https://www.googleapis.com/youtube/v3/playlistItems';
    const params = {
      key: apiKey,
      part: 'snippet',
      playlistId: 'PL4fGSI1pDJn6jXS_Tv_N9B8Z0HTRVJE0m',
      maxResults: 50,
      // pageToken:
      //   'EAAaLVBUOkNESWlFRGMzUVVaR1JEWTNORGd6TjBNek5ESW9BVWljcG9PU243V0NBdw',
    };

    try {
      const response = await axios.get(apiUrl, { params });

      const songs: CreateSongDto[] = await pipe(
        [response],
        toAsync,
        map((res) => res.data.items),
        flat,
        map((item) => {
          return {
            title: item.snippet.title,
            artist: item.snippet.videoOwnerChannelTitle,
            youtubeVideoId: item.snippet.resourceId.videoId,
          };
        }),
        toArray,
      );

      each((song) => this.createSong(song), songs);

      return true;
    } catch (e) {
      console.error(e);
    }
  }
}
