import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Submission } from '../models/comments';
import { BaseService } from './base.service';
import { HttpClientService } from '../util-services/http-client.service';
import { HttpEvent } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubmissionsService extends BaseService {
  constructor(private httpClient: HttpClientService) { super(); }

  getSubmission(submissionId: number): Observable<Submission> {
    return this.httpClient.get<Submission>(`${this.apiRoot}api/submissions/${submissionId}`)
      .pipe(map(res => res));
  }

  getSubmissions(): Observable<Submission[]> {
    return this.httpClient.get<Submission[]>(`${this.apiRoot}api/submissions`)
      .pipe(map(res => res));
  }

  postThread(input: Submission): Observable<HttpEvent<Submission>> {
    return this.httpClient.post<Submission>(`${this.apiRoot}api/submissions`, input, this.httpOptions)
      .pipe(map(res => res));
  }
}
