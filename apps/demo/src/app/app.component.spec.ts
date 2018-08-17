import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { expectElementFromFixture } from '@ngxp/common/test';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                imports: [
                    RouterTestingModule
                ],
                declarations: [
                    AppComponent,
                    NavbarComponent
                ]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('renders the navbar', () => {
        expectElementFromFixture(fixture, 'ngxp-navbar').not.toBeNull();
    });
});
