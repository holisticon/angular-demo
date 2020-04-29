import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { address } from '@ngxp/user-profile/test';
import { AddressComponent } from './address.component';

describe('AddressComponent', () => {
    let component: AddressComponent;
    let fixture: ComponentFixture<AddressComponent>;

    beforeEach(async(() => {
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
