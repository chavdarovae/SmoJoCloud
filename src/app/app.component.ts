import { Component } from '@angular/core';
import { LoadingService } from './shared/services/loading.service';
import { MessagesService } from './shared/services/messages.service';
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
