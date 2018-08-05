import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { UserProfile } from './user-profile.model';
import { UserProfileService } from './user-profile.service';
import { userProfile } from '@luchsamapparat/user-profile-common/test';

describe('UserProfileService', () => {
    let userProfileService: UserProfileService;
    let httpController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                UserProfileService
            ]
        });

        userProfileService = TestBed.get(UserProfileService);
        httpController = TestBed.get(HttpTestingController);
    });

    describe('loadUserProfile', () => {
        it('loads the user profile from the backend', () => {
            userProfileService.loadUserProfile()
                .subscribe(returnedUserProfile => {
                    expect(returnedUserProfile).toBe(userProfile);
                });

            const request = httpController.expectOne(`http://hypercontract.herokuapp.com/userProfile`);

            expect(request.request.method).toEqual('GET');

            request.flush(userProfile);

            httpController.verify();
        });
    });

});
