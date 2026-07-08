import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';

import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { MediaValidationService } from './media-validation.service';

@Module({
  imports: [PrismaModule],
  controllers: [MediaController],
  providers: [
    MediaService,
    MediaValidationService,
  ],
})
export class MediaModule {}