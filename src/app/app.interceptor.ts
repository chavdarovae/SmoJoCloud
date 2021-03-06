import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const fullUrl = req.url.includes('http') ? req.url : `${apiUrl}/${req.url}`;
    const isApiUrl = fullUrl.includes(apiUrl);

    if (!isApiUrl) return;

    if (fullUrl.includes('login') || fullUrl.includes('register')) {
      req = req.clone({
        url: fullUrl,
        setHeaders: { 'Content-Type': 'application/json' }
      });
    } else {
      const currUser: { userName: string, userToken: string } = JSON.parse(localStorage.getItem('curr-user'));
      req = req.clone({
        url: fullUrl,
        setHeaders: {
          'Content-Type': 'application/json',
          'user-token': `${currUser.userToken}`,
        }
      });
    }

    return next.handle(req);
  }
}

