export interface Service {
    id?: string;
    title: language ;
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
