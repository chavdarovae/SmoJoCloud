import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import { IJob } from '../shared/interfaces/job.interface';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  currJob: IJob;
  searchMode: boolean = true;

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {

  }

  postJob(newJob: IJob, collection: string) {
    return this.http.post<IJob>(`data/${collection}`, JSON.stringify(newJob))
      .pipe(tap((res) => { }),
        catchError(err => {
          const msg = 'Could not post the current job'
          console.log(msg, err);
          return throwError(err)
        }))
  }

  getJobList(collection: string) {
    return this.http.get<[IJob]>(`data/${collection}?sortBy=created%20desc`)
      .pipe(tap((res) => { }),
        catchError(err => {
          const msg = 'Could not load jobs'
          console.log(msg, err);
          return throwError(err)
        }),
        shareReplay())
  }

  getJobById(collection: string, id: string) {
    return this.http.get<IJob>(`data/${collection}?where=objectId%20%3D%20'${id}'`).pipe(tap((res) => {
      console.log(res);
    }))
  }

  getJobListByUserId(collection: string) {
    const url = `data/${collection}?where=ownerId%20%3D%20'${this.userService.currUser.userId}'&sortBy=created%20desc`
    return this.http.get<[IJob]>(url).pipe(tap((res) => {
      console.log(res);
    }))
  }

  getFilteredJobList(collection: string, location: string, category: string) {
    if (category) category = category.replace('&', '%26')

    let url = `data/${collection}?where=location%20%3D%20'${location}'and%20category%20%3D%20'${category}'&sortBy=created%20desc`;
    if (!location) {
      url = `data/${collection}?where=category%20%3D%20'${category}'&sortBy=created%20desc`
    } else if (!category) {
      url = `data/${collection}?where=location%20%3D%20'${location}'&sortBy=created%20desc`
    }

    return this.http.get<[IJob]>(url).pipe(tap((res) => {
      console.log(res);
    }))
  }
}
