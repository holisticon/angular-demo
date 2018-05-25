export type Resource<T> = T & ResourceId;

export interface ResourceId {
    _id: string;
}
