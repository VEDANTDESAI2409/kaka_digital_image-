import { GalleryResponseDto } from '../dto/gallery-response.dto';

export class GalleryMapper {
  static toResponse(event: any): GalleryResponseDto {
    return {
      gallery: {
        title: event.title,
        eventType: event.eventType,
        clientName:
          event.booking.client.fullName,
      },

      albums: event.albums.map(
        (album: any) => ({
          id: album.id,
          title: album.title,

          sections: album.sections.map(
            (section: any) => ({
              id: section.id,
              title: section.title,

              photos: section.media.map(
                (photo: any) => ({
                  id: photo.id,
                  filename: photo.filename,
                  mimeType: photo.mimeType,
                }),
              ),
            }),
          ),
        }),
      ),
    };
  }
}