export type Resource<T> = T & ResourceId;

export interface ResourceId {
    _id: string;
}

export interface ResourceWith<T, R extends Resource<any> = Resource<any>> {
    resource: R,
    with: T
}
