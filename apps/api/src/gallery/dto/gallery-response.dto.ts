export class GalleryPhotoDto {
  id: string;
  filename: string;
  mimeType: string;
}

export class GallerySectionDto {
  id: string;
  title: string;
  photos: GalleryPhotoDto[];
}

export class GalleryAlbumDto {
  id: string;
  title: string;
  sections: GallerySectionDto[];
}

export class GalleryInfoDto {
  title: string;
  eventType: string;
  clientName: string;
}

export class GalleryResponseDto {
  gallery: GalleryInfoDto;
  albums: GalleryAlbumDto[];
}