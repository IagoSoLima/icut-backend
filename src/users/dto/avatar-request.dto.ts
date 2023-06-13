import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AvatarRequestDTO {
  @ApiProperty({
    type: 'file',
    format: 'binary',
    required: true
  })
  @IsNotEmpty({
    message: 'FILE_IS_REQUIRED'
  })
  file: Express.Multer.File;
}
