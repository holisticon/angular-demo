export type Resource<T> = T & { _id: ResourceId };

export type ResourceId = string;

export interface ResourceWith<T, R extends Resource<any> = Resource<any>> {
    resource: R,
    with: T
}

export interface ResourceMap<T> {
    [key: string]: Resource<T>
}
