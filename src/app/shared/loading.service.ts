import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loadingSubject = new BehaviorSubject<boolean>(false);
  
  loading$: Observable <boolean> =this.loadingSubject.asObservable();

  showLoaderUntilCompleted <T> (obs$: Observable<T>): Observable <T>{
    return undefined;
  }

  loadingOn(){
    this.loadingSubject.next(true);
  }

  loadingOff(){
    this.loadingSubject.next(false);
  }
}
