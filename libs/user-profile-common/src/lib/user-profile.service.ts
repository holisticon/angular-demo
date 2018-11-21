import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfile } from './user-profile.model';

@Injectable({
    providedIn: 'root'
})
export class UserProfileService {

    constructor(
        private httpClient: HttpClient
    ) { }

    loadUserProfile(): Observable<UserProfile> {
        return this.httpClient
            .get<UserProfile>(`https://example.hypercontract.org/userProfile`);
    }

}
