import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  get userIsLogged (){
    return this.userService.isLogged;
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
