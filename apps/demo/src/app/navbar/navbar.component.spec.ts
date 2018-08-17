import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { expectElementFromFixture } from '@ngxp/common/test';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;

    beforeEach(
        async(() => {
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
});
