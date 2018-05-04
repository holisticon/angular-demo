import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { expectElementFromFixture } from 'ngx-test-helpers';
import { HomepageModule } from '../homepage.module';
import { HomepageComponent } from './homepage.component';


describe('HomepageComponent', () => {
    let component: HomepageComponent;
    let fixture: ComponentFixture<HomepageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HomepageModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomepageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('renders a product search form', () => {
        expectElementFromFixture(fixture, 'cfha-product-search-form').not.toBeNull();
    });
});
