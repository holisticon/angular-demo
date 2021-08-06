import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
            .get<UserProfile>('https://webapp-demos-api.azurewebsites.net/userProfile');
    }

}
