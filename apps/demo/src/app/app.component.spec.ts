import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { expectElementFromFixture } from '@ngxp/common/test';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [
                    RouterTestingModule
                ],
                declarations: [
                    AppComponent
                ],
                schemas: [
                    CUSTOM_ELEMENTS_SCHEMA
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
