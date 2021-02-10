import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IJob } from './job.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {

  constructor(
    private http:HttpClient
  ) { }

  applicationId = 'D5B2B971-C14A-548A-FF57-6688231F8D00';
  RESTApiKey = '09493139-2050-470E-8BD2-83D7D7097D09';

  makeAuth(auth: string) {
    if (auth == 'basic') {
      return {
        'Content-Type': 'application/json'
      }
    }
  }

  get(collection: string, id?: string) {
    return this.http.get<IJob[] | IJob>(`https://api.backendless.com/${this.applicationId}/${this.RESTApiKey}/data/${collection}${id? `/${id}`: ''}`);
  }

  post(collection: string, endpoint: string, data?: any) {
    return this.http.post<any>(`https://api.backendless.com/${this.applicationId}/${this.RESTApiKey}/${collection}/${endpoint}`, JSON.stringify(data));
  }

  update(collection: string, endpoint: string, data: IJob) {
    return this.http.put<IJob>(`https://api.backendless.com/${this.applicationId}/${this.RESTApiKey}/data/${collection}/${endpoint}`, data);
  }
}
