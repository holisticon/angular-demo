import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '@ngxp/products-common';
import { Resource } from '@ngxp/resource';
import { isNull } from 'lodash-es';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(
        private httpClient: HttpClient
    ) {}

    searchProducts(query: string | null) {
        const queryString = isNull(query) ? '' : `?query=${encodeURIComponent(query)}`;
        return this.httpClient
            .get<Resource<Product>[]>(`http://localhost:80/products${queryString}`,
                { 'headers': new HttpHeaders({ 'accept': 'application/prs.hal-forms+json' }) });
    }


}
