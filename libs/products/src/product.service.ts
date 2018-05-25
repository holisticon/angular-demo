import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '@luchsamapparat/products-common';
import { isNull } from 'lodash-es';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class ProductService {

    constructor(
        private httpClient: HttpClient
    ) {}

    searchProducts(query: string): Observable<Product[]> {
        const queryString = isNull(query) ? '' : `?query=${encodeURIComponent(query)}`
        return this.httpClient
            .get<Product[]>(`http://localhost/products${queryString}`);
    }

}
