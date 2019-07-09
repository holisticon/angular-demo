import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resource } from '@ngxp/common';
import { UserProfile } from './user-profile.model';

@Injectable({
    providedIn: 'root'
})
export class UserProfileService {

    constructor(
        private httpClient: HttpClient
    ) { }

    loadUserProfile() {
        return this.httpClient
            .get<Resource<UserProfile>>('https://example.hypercontract.org/userProfile');
    }

}
