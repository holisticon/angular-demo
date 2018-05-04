import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '@luchsamapparat/products/products-common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class ProductService {

    constructor(
        private httpClient: HttpClient
    ) {}

    searchProducts(query: string): Observable<Product[]> {
        return this.httpClient
        .get<Product[]>(`http://localhost/products/?query=${encodeURIComponent(query)}`);
    }

}
