
export interface Image {
  id?: string;
  name: ImageTranslation;
  description: ImageTranslation;
  image: string;
  storagePath: string;
  createdAt: string;
  updatedAt: string;
}

export interface ImageTranslation {
  en: string;
  es: string;
}
