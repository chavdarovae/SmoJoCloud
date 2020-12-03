import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  showUserMenu: boolean = false;
  // @ViewChild ('userMenu') userMenu: ElementRef<HTMLElement>;

  get userIsLogged (){
    return this.userService.isLogged;
  }

  get name (){
    return (this.userService.currUser.userName).match(/(.*)+(?=@)/g)[0];
  }

  constructor(
    private userService : UserService,
    private router : Router,
  ) { }

  logout() {
    this.userService.logout().subscribe(() => {
      this.userService.currUser = null;
      this.router.navigate(['']);
    });
  }
}
