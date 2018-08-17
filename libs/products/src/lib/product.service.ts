import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '@ngxp/products-common';
import { isNull } from 'lodash-es';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(
        private httpClient: HttpClient
    ) {}

    searchProducts(query: string): Observable<Product[]> {
        const queryString = isNull(query) ? '' : `?query=${encodeURIComponent(query)}`
        return this.httpClient
            .get<Product[]>(`http://example.hypercontract.org/products${queryString}`);
    }

}
