import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ObserveOnSubscriber } from 'rxjs/internal/operators/observeOn';
import { tap } from 'rxjs/operators';
import { MessagesService } from '../services/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  errors$: Observable<string[]>;
  showMessages: boolean = false; //to initially keep the message panel hiddens
  
  // When a service is public it is reachable by the template
  constructor(public messagesService: MessagesService) { 
    console.log('Created messages component!');
  }

  ngOnInit() {
    this.errors$= this.messagesService.errors$
      .pipe(
        tap(()=> this.showMessages = true)
      )
  }

  onClicked() {
    this.showMessages = false;
  }

}
