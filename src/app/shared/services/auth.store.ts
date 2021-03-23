import { AUTH_DATA } from './../../app.constants';
import { IUserRes } from './../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';

@Injectable({
    // We will have only one instance of the Store in the whole application, count as Application Singleton
    providedIn: 'root'
})
export class AuthStore {

  private subject = new BehaviorSubject<IUserRes>(null);
  user$: Observable<IUserRes> = this.subject.asObservable();
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  get userFirstName(): string{
    const user = localStorage.getItem(AUTH_DATA);
    return (JSON.parse(user).username).match(/(.*)+(?=@)/g)[0];
  }

  constructor(private http: HttpClient) {
    this.isLoggedIn$ = this.user$.pipe(map(userAccount => !!userAccount));
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map(isLoggedIn => !isLoggedIn));
    const user = localStorage.getItem(AUTH_DATA);
    if (user) {
      this.subject.next(JSON.parse(user));
    }
  }

  login(email: string, password: string): Observable<IUserRes>{
    return this.http.post<IUserRes>('users/login', { login: email, password })
            .pipe(
              tap(user => {
                this.subject.next(user);
                localStorage.setItem(AUTH_DATA, JSON.stringify(user));
              }),
              shareReplay()
            );
  }

  logout(): void {
    this.subject.next(null);
    localStorage.removeItem(AUTH_DATA);
  }
}
