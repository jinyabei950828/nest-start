import { IsInt, IsString } from 'class-validator';

export class CreateCatDto {
  //标识是字符串
  @IsString()
  readonly name: string;

  //标识是整型
  @IsInt()
  readonly age: number;

  @IsString()
  readonly bread: string;
}