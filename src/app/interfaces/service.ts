export interface Service {
    id?: string;
    title: language ;
    url: string;
    briefDescription: language ;
    description: language ;
    icon?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
interface language {
    en: string;
    es: string;
}
