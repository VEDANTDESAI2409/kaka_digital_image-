import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from './clients/clients.module';
import { BookingsModule } from './bookings/bookings.module';
import { EventsModule } from './events/events.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { AlbumsModule } from './albums/albums.module';
import { SectionsModule } from './sections/sections.module';
import { MediaModule } from './media/media.module';
import { GalleryModule } from './gallery/gallery.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    PrismaModule,
    AuthModule,
    UsersModule,
    ClientsModule,
    BookingsModule,
    EventsModule,
    AssignmentsModule,
    AlbumsModule,
    SectionsModule,
    MediaModule,
    GalleryModule,
    DashboardModule,
  ],
  
})
export class AppModule {}