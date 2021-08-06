export type Resource<T> = T & { _id: ResourceUri };

export type ResourceUri = string;

export interface ResourceWith<T, R extends Resource<unknown> = Resource<unknown>> {
    resource: R,
    with: T
}

export interface ResourceMap<T> {
    [key: string]: Resource<T>
}
