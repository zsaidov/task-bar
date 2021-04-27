import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, mergeMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {TokenService} from './token.service';
import {API_BASE_URL} from './end-point';
import {User} from '../models/user.model';

@Injectable({providedIn: 'root'})
export class AuthenticationService {

    constructor(private http: HttpClient,
                @Inject(API_BASE_URL) private hostUrl,
                private tokenService: TokenService) {
    }

    get isLoggedIn(): boolean {
        return !!this.tokenService.getToken();
    }

    login(username: string, password: string): Observable<User> {
        const form = new FormData();
        form.append('username', username);
        form.append('password', password);
        return this.http.post<any>(`${this.hostUrl}login?developer=Zohid`, form)
            .pipe(map((res => {
                if (res.status === 'ok') {
                    this.tokenService.setToken(res.message.token);
                }
                return res;
            })));
    }

    logout(): void {
        this.tokenService.clear();
    }
}
