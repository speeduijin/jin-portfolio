import { Column, Entity } from 'typeorm';
import { BaseModel } from 'src/common/entity/base.entity';
import { IsString } from 'class-validator';

@Entity()
export class SongsModel extends BaseModel {
  @Column()
  @IsString()
  title: string;

  @Column()
  @IsString()
  artist: string;

  @Column()
  @IsString()
  youtubeVideoId: string;

  @Column({ default: 0 })
  playCount: number;
}
