import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { userProfile } from '@ngxp/user-profile-common/test';
import { UserProfileService } from './user-profile.service';

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

            const request = httpController.expectOne('http://localhost:80/userProfile');

            expect(request.request.method).toEqual('GET');

            request.flush(userProfile);

            httpController.verify();
        });
    });

});
