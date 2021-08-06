import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { expectElementFromFixture } from '@holisticon/common/test';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
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
        fixture.detectChanges();
    });

    it('renders the navbar', () => {
        expectElementFromFixture(fixture, 'holisticon-navbar').not.toBeNull();
    });
});
