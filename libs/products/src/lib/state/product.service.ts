import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resource, ResourceUri } from '@holisticon/resource';
import { isNull } from 'lodash-es';
import { Product, SearchResults } from '../domain';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(
        private httpClient: HttpClient
    ) { }

    searchProducts(queryString: string | null) {
        const queryParams = isNull(queryString) ? '' : `?queryString=${encodeURIComponent(queryString)}`
        return this.httpClient
            .get<SearchResults>(`https://webapp-demos-api.azurewebsites.net/products${queryParams}`);
    }

    loadProduct(id: ResourceUri) {
        return this.httpClient
            .get<Resource<Product>>(id);
    }

}
