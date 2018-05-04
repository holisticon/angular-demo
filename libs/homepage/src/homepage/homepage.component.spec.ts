import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { expectElementFromFixture } from 'ngx-test-helpers';
import { HomepageComponent } from './homepage.component';


describe('HomepageComponent', () => {
    let component: HomepageComponent;
    let fixture: ComponentFixture<HomepageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HomepageComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomepageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('renders a product search form', () => {
        expectElementFromFixture(fixture, 'form').not.toBeNull();
    });
});
