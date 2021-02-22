import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, shareReplay, tap } from "rxjs/operators";
import { IJob } from "../interfaces/job.interface";
import { LoadingService } from "./loading.service";
import { MessagesService } from "./messages.service";

@Injectable({
    // We will have only one instance of the Store in the whole application
    providedIn: 'root'
})
export class JobStore {
    private subject= new BehaviorSubject<IJob[]>([]);
    jobs$: Observable<IJob[]> = this.subject.asObservable();

    constructor(
        private http: HttpClient,
        private loadingService: LoadingService,
        private messagesService: MessagesService
    ) {
        this.loadAllJobs('collection');
    }

    filterByCategory(category: string): Observable<IJob[]>{
        return this.jobs$.pipe(
            // map(jobs => jobs.filter())
            tap(res => console.log('Imame lists s jobs'))
        )
    }

    private loadAllJobs(collection: string){
        const loadJobs$ = this.http.get<[IJob]>(`data/${collection}?sortBy=created%20desc`)
            .pipe(
                catchError(err => {
                const msg = 'Could not load jobs'
                this.messagesService.showErrors(msg)
                console.log(msg, err);
                return throwError(err)
                }),
                tap(jobs => this.subject.next(jobs))
            )

        this.loadingService.showLoaderUntilCompleted(loadJobs$).subscribe();
    }

}