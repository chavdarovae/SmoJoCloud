import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{

  get isLogged():boolean {
    return !!this.userService.currUser;
  }

  constructor(
    private userService : UserService
  ) { }

}
