import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay, tap } from 'rxjs/operators';
import { IUser, IUserRes } from '../shared/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currUser: IUser;

  get isLogged() {
    return !!this.currUser;
  }

  constructor(
    private http: HttpClient
  ) {
    //to initially know if the user is logged in
    const currentUser = localStorage.getItem('curr-user');
    this.currUser = currentUser ? JSON.parse(currentUser) : null;
  }

  login(email: string, password: string) {
    return this.http.post('users/login', { 'login': email, 'password': password }).pipe(tap((user: IUserRes ) => {
      this.currUser = { userName: user['username'], userToken: user['user-token'] };
      localStorage.setItem('curr-user', JSON.stringify(this.currUser));
    }))
  }

  register(email: string, password: string) {
    return this.http.post('users/register', { 'username': email, password }).pipe(tap(() => {
    }))
  }

  logout() {
    return this.http.get('users/logout').pipe(tap(() => {
      this.currUser = null;
      localStorage.removeItem('curr-user');
    }))
  }
}
