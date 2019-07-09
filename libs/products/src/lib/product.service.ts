import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resource } from '@ngxp/common';
import { Product } from '@ngxp/products-common';
import { isNull } from 'lodash-es';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(
        private httpClient: HttpClient
    ) {}

    searchProducts(query: string | null) {
        const queryString = isNull(query) ? '' : `?query=${encodeURIComponent(query)}`
        return this.httpClient
            .get<Resource<Product>[]>(`https://example.hypercontract.org/products${queryString}`);
    }

}
