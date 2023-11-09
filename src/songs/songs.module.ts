import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';
import { SongsModel } from './entity/songs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SongsModel])],
  controllers: [SongsController],
  providers: [SongsService],
})
export class SongsModule {}
