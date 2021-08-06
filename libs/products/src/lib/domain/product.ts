import { Resource } from '@holisticon/resource';

export interface SearchResults {
    products: Product[];
    totalResults: number;
}

export type Product = Resource<{
    productName: string;
    productDescription: string;
    price: number;
    image: string;
}>
