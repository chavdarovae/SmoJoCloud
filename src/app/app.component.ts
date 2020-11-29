import { Component } from '@angular/core';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SmoJoCloud';

  get isReady():boolean {
    return this.userService.currUser !== undefined;
  }

  constructor(
    private userService: UserService
  ) { }
}
