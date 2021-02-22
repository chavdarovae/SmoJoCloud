import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable()
export class MessagesService {
  
  // We need the private subject since it remembers the last value and makes it available to the new subscribers
  // and it also has the ability of emitting new errors
  private subject = new BehaviorSubject<string[]>([]);
  // With the errors$ we could not emit new errors, we could only subscribe to them
  errors$: Observable<string[]> = this.subject.asObservable()
    .pipe(
      // Filters out the initial value of an empty array
      filter(messages => messages && messages.length > 0)
    );

  constructor() { }

  showErrors(...errors: string[]) {
    this.subject.next(errors);
  }
}
