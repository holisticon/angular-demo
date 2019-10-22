import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { products } from '@ngxp/products-common/test';
import { ProductService } from './product.service';

describe('ProductService', () => {
    let productService: ProductService;
    let httpController: HttpTestingController;

    const query = 'query';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                ProductService
            ]
        });

        productService = TestBed.get(ProductService);
        httpController = TestBed.get(HttpTestingController);
    });

    describe('searchProducts', () => {
        it('loads products matching the given query from the backend', () => {
            productService.searchProducts(query)
                .subscribe(searchResults => {
                    expect(searchResults).toBe(products);
                });

            const request = httpController.expectOne(`http://localhost:80/products?query=${query}`);

            expect(request.request.method).toEqual('GET');

            request.flush(products);

            httpController.verify();
        });
    });

});
