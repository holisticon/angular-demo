import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { userProfile } from '@ngxp/user-profile/test';
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

        userProfileService = TestBed.inject(UserProfileService);
        httpController = TestBed.inject(HttpTestingController);
    });

    describe('loadUserProfile', () => {
        it('loads the user profile from the backend', () => {
            userProfileService.loadUserProfile()
                .subscribe(returnedUserProfile => {
                    expect(returnedUserProfile).toBe(userProfile);
                });

            const request = httpController.expectOne('https://webapp-demos-api.azurewebsites.net/userProfile');

            expect(request.request.method).toEqual('GET');

            request.flush(userProfile);

            httpController.verify();
        });
    });

});
