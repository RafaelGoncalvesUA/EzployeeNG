import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  postComment(header: any): Observable<any> {
    const url = this.baseUrl + '/comments/';
    return this.http.post(url, header);
  }

  postReply(header: any): Observable<any> {
    const url = this.baseUrl + '/replies/';
    return this.http.post(url, header);
  }

}
