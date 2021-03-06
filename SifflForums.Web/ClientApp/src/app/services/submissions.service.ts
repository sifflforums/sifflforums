import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Submission } from '../models/comments';
import { HttpClientService } from '../util-services/http-client.service';
import { BaseService } from './base.service';
import { PaginatedResult } from '../models/pagination';

@Injectable({
  providedIn: 'root'
})
export class SubmissionsService extends BaseService {
  constructor(private httpClient: HttpClientService) { super(); }

  getSubmission(submissionId: string): Observable<Submission> {
    return this.httpClient.get<Submission>(`${this.apiRoot}api/submissions/${submissionId}`)
      .pipe(map(res => res));
  }

  getSubmissions(forumSectionId: string, sort: string, pageIndex: number, pageSize: number): Observable<PaginatedResult<Submission[]>> {
    return this.httpClient.get<PaginatedResult<Submission[]>>(`${this.apiRoot}api/submissions?forumSectionId=${forumSectionId}&sort=${sort}&pageIndex=${pageIndex}&pageSize=${pageSize}`)
      .pipe(map(res => res));
  }

  postSubmission(input: Submission): Observable<Submission> {
    return this.httpClient.post<Submission>(`${this.apiRoot}api/submissions`, input, this.httpHeaders)
      .pipe(map(res => res));
  }

  upvote(submissionId: string): Observable<void> {
    return this.httpClient.put<void>(`${this.apiRoot}api/submissions/${submissionId}/upvote`, null, this.httpHeaders)
      .pipe(map(res => res));
  }

  downvote(submissionId: string): Observable<void> {
    return this.httpClient.put<void>(`${this.apiRoot}api/submissions/${submissionId}/downvote`, null, this.httpHeaders)
      .pipe(map(res => res));
  }

  removevote(submissionId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiRoot}api/submissions/${submissionId}/removevotes`, this.httpHeaders)
      .pipe(map(res => res));
  }
}
