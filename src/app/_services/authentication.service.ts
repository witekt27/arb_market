import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_models/user';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { stringify } from 'querystring';
import {ConfigService} from 'src/app/services/config-service.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private content: string;
    body: any;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username, password) {
        return this.http.post<any>(`${config.apiUrl}/users/authenticate`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    log_in(user: User)
    {
      //  this.user = new User();
      //  this.user.accountNo = '500';
      this.content = JSON.stringify(user);

      //  this.currentUserSubject.next(this.user);
      //  return this.user;


      return this.http.post<any>(ConfigService.get('api') + 'LoginAuth/?content=' + this.content, this.body);

    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
    logAuth(user: User)
    {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
    }
}