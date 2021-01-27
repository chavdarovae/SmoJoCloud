import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  showMessages: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  onClicked() {
    this.showMessages = false;
  }

}
