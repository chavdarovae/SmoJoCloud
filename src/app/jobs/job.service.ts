import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { IJob } from '../shared/interfaces/job.interface';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class JobService {
 
  currJob: IJob;

  categories = [
    { value: 'it', title: 'IT and Hardware' },
    { value: 'construction', title: 'Construction and Refurbrishment' },
    { value: 'gardening', title: 'Gardening and Irrigation' },
    { value: 'cleaning', title: 'Cleaning and Housekeeping' },
  ];

  get locations(){
    return ['Hamburg','Devin', 'Lom']
  }

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  postJob(newJob: IJob) {
    return this.http.post<IJob>('data/jobList', JSON.stringify(newJob)).pipe(tap((res)=>{
      console.log(res);
    }))
  }

  postFreelance(newJob: IJob) {
    return this.http.post<IJob>('data/freelanceList', JSON.stringify(newJob)).pipe(tap((res)=>{
      console.log(res);
    }))
  }

  getJobList() {
    return this.http.get<[IJob]>('data/jobList?sortBy=created%20desc').pipe(tap((res)=>{
      console.log(res);
    }))
  }
  
  getFreelanceList() {
    return this.http.get<[IJob]>('data/freelanceList?sortBy=created%20desc').pipe(tap((res)=>{
      console.log(res);
    }))
  }

  getJobListByUserId() {
    const url = `data/jobList?where=ownerId%20%3D%20'${this.userService.currUser.userId}'&sortBy=created%20desc`
    return this.http.get<[IJob]>(url).pipe(tap((res)=>{
      console.log(res);
    }))
  }
  
  getFreelanceListByUserId() {
    const url = `data/freelanceList?where=ownerId%20%3D%20'${this.userService.currUser.userId}'&sortBy=created%20desc`
    return this.http.get<[IJob]>(url).pipe(tap((res)=>{
      console.log(res);
    }))
  }

  getFilteredJobList( location:string, category:string ) {
    const url = `data/jobList?where=location%20%3D%20'${location}'and%20category%20%3D%20'${category}'&sortBy=created%20desc`
    return this.http.get<[IJob]>(url).pipe(tap((res)=>{
      console.log(res);
    }))
  }

  getFilteredFreelanceList( location:string, category:string ) {
    const url = `data/freelanceList?where=location%20%3D%20'${location}'and%20category%20%3D%20'${category}'&sortBy=created%20desc`
    return this.http.get<[IJob]>(url).pipe(tap((res)=>{
      console.log(res);
    }))
  }
}
