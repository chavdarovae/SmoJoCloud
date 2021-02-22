import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, forkJoin, Observable, throwError } from "rxjs";
import { catchError, map, shareReplay, tap } from "rxjs/operators";
import { IJob } from "../interfaces/job.interface";
import { LoadingService } from "./loading.service";
import { MessagesService } from "./messages.service";

@Injectable({
    // We will have only one instance of the Store in the whole application
    providedIn: 'root'
})
export class JobStore {
    // custom job obsservable defined through a behaviour subject
    private jobSubject = new BehaviorSubject<IJob[]>([]);
    jobs$: Observable<IJob[]> = this.jobSubject.asObservable();

    // custom job obsservable defined through a behaviour subject
    private freelanceSubject = new BehaviorSubject<IJob[]>([]);
    freelances$: Observable<IJob[]> = this.freelanceSubject.asObservable();
    
    // category and location sets definition
    jobLocationSet: string[] = [];
    jobCategorySet: string[] = [];
    freelanceLocationSet: string[] = [];
    freelanceCategorySet: string[] = [];

    constructor(
        private http: HttpClient,
        private loadingService: LoadingService,
        private messagesService: MessagesService
    ) {
        this.loadAllJobs();
    }

    // Filters by location and category
    filterByLocationOrCategory(isSearchMode: boolean, location: string, category: string): Observable<IJob[]>{
        const filteredList$ = isSearchMode ? this.jobs$ : this.freelances$;
        return filteredList$.pipe(
            map(ads => location ? ads.filter(ad => ad.location === location) : ads),
            map(ads => category ? ads.filter(ad => ad.category === category) : ads)
        )
    }

    // Loads all adds and creates sets for the locations and the categories
    private loadAllJobs(){
        const jobList$ = this.http.get<[IJob]>(`data/jobList?sortBy=created%20desc`)
            .pipe(
                catchError(err => this.handleError(err, 'Could not load job list!')),
                tap(jobs => {
                    this.jobSubject.next(jobs);
                    this.jobLocationSet = Array.from(new Set(jobs.map(job => job.location))).sort();
                    this.jobCategorySet = Array.from(new Set(jobs.map(job => job.category))).sort();
                })
            )

        const freelanceList$ = this.http.get<[IJob]>(`data/freelanceList?sortBy=created%20desc`)
            .pipe(
                catchError(err => this.handleError(err, 'Could not load freelance list!')),
                tap(freelances => {
                    this.freelanceSubject.next(freelances);
                    this.freelanceLocationSet = Array.from(new Set(freelances.map(freelance => freelance.location))).sort();
                    this.freelanceCategorySet = Array.from(new Set(freelances.map(freelance => freelance.category))).sort();
                })
            )
        
        const loadLists$ = forkJoin({jobList$, freelanceList$});
        this.loadingService.showLoaderUntilCompleted(loadLists$).subscribe();
    }

    // Standard error handling
    private handleError(err: any, msg: string): Observable<never>{
        this.messagesService.showErrors(msg)
        console.log(msg, err);
        return throwError(err)
    }

}