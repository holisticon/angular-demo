import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProfile } from '@luchsamapparat/user-profile-common/src/user-profile.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserProfileService {

    constructor(
        private httpClient: HttpClient
    ) { }

    loadUserProfile(): Observable<UserProfile> {
        return this.httpClient
            .get<UserProfile>(`http://localhost/userProfile`);
    }

}
