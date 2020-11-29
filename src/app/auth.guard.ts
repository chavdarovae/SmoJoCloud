import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { UserService } from './user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService) { }

  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.userService.isLogged === router.data.isLogged;
  }
}
