import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResults } from '@ngxp/products/domain';
import { Resource } from '@ngxp/resource';
import { isNull } from 'lodash-es';

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
