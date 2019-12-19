import { Resource } from '@ngxp/resource';

export interface SearchResults {
    products: Resource<Product>[];
    totalResults: number;
}

export interface Product {
    productName: string;
    productDescription: string;
    price: number;
    image: string;
}
