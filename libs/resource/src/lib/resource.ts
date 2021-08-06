export type Resource<T> = T & { _id: ResourceUri };

export type ResourcePayload<R> = R extends Resource<(infer RP)> ? RP : R;

export type ResourceUri = string;

export interface ResourceWith<T, R extends Resource<RP>, RP = unknown> {
    resource: R,
    with: T
}

export interface ResourceMap<R> {
    [key: string]: R
}
