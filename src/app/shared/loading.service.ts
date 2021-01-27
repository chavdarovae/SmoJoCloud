import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { concatMap, finalize, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loadingSubject = new BehaviorSubject<boolean>(false);
  
  loading$: Observable <boolean> =this.loadingSubject.asObservable();

<<<<<<< HEAD
  showLoaderUntilCompleted <T> (obs$: Observable<T>): Observable <T>{
    return of(null)
    .pipe(
      tap(()=>this.loadingOn()),
      concatMap(()=>obs$),
      finalize(()=> this.loadingOff())
=======
  showLoaderUntilCompleted <T> (obs$: Observable<T>): Observable<T>{
    return of(null)
      .pipe(
        tap(()=>this.loadingOn()),
        concatMap(()=> obs$),
        finalize(()=>this.loadingOff())
>>>>>>> b0023a3fe560f441fb3f068b72672ecae91e12c0
    );
  }

  loadingOn(){
    this.loadingSubject.next(true);
  }

  loadingOff(){
    this.loadingSubject.next(false);
  }
}
