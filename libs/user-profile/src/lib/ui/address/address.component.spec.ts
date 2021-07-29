import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { address } from '@holisticon/user-profile/test';
import { AddressComponent } from './address.component';

describe('AddressComponent', () => {
    let component: AddressComponent;
    let fixture: ComponentFixture<AddressComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                AddressComponent
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddressComponent);
        component = fixture.componentInstance;
        component.address = address;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
