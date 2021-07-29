import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { expectElementFromFixture } from '@holisticon/common/test';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [
                    NavbarComponent
                ]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(NavbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('renders a link to the homepage', () => {
        expectElementFromFixture(fixture, 'a[routerLink="/"]').not.toBeNull();
    });

    it('renders a link to each section of the app', () => {
        expectElementFromFixture(fixture, 'a[routerLink="products"]').not.toBeNull();
        expectElementFromFixture(fixture, 'a[routerLink="shopping-cart"]').not.toBeNull();
        expectElementFromFixture(fixture, 'a[routerLink="orders"]').not.toBeNull();
        expectElementFromFixture(fixture, 'a[routerLink="user-profile"]').not.toBeNull();
    });
});
