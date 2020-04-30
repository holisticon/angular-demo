import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { products } from '@ngxp/products/test';
import { ProductService } from './product.service';

describe('ProductService', () => {
    let productService: ProductService;
    let httpController: HttpTestingController;

    const queryString = 'query';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                ProductService
            ]
        });

        productService = TestBed.inject(ProductService);
        httpController = TestBed.inject(HttpTestingController);
    });

    describe('searchProducts', () => {
        it('loads products matching the given query from the backend', () => {
            productService.searchProducts(queryString)
                .subscribe(searchResults => {
                    expect(searchResults).toBe(products);
                });

            const request = httpController.expectOne(`https://example.hypercontract.org/products?queryString=${queryString}`);

            expect(request.request.method).toEqual('GET');

            request.flush(products);

            httpController.verify();
        });
    });

});
