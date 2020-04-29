import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resource } from '@ngxp/resource';
import { isNull } from 'lodash-es';
import { SearchResults } from '../domain/product';

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
            .get<Resource<SearchResults>>(`https://example.hypercontract.org/products${queryParams}`);
    }

}
