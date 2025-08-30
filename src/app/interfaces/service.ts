export interface Service {
    id?: string;
    title: language ;
    url: string;
    briefDescription: language ;
    longDescription: language ;
    subServices: subService[];
    icon?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
interface language {
    en: string;
    es: string;
}

interface subService {
    id?: string;
    title: language ;
    url: string;
    briefDescription: language ;
    longDescription: language ;
    icon?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
