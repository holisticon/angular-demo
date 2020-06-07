import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resource } from '@ngxp/resource';
import { UserProfile } from '../domain';

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
