import { AuthStore } from './../../shared/services/auth.store';
import { Component } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  showUserMenu = false;

  constructor( public auth: AuthStore ) { }
}
