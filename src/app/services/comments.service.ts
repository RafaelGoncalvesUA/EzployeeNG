import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getCommentsByCompany(id: number): Observable<any> {
    const url = this.baseUrl + '/comments?id=' + id;
    return this.http.get(url);
  }

  getRepliesByComment(id: number): Observable<any> {
    const url = this.baseUrl + '/replies?id=' + id;
    return this.http.get(url);
  }

  postComment(header: any): Observable<any> {
    const url = this.baseUrl + '/comments/';
    return this.http.post(url, header);
  }

  postReply(header: any): Observable<any> {
    const url = this.baseUrl + '/replies/';
    return this.http.post(url, header);
  }

  deleteComment(id: number): Observable<any> {
    const url = this.baseUrl + '/comments?id=' + id;
    return this.http.delete(url);
  }

  deleteReply(id: number): Observable<any> {
    const url = this.baseUrl + '/replies/?id=' + id;
    return this.http.delete(url);
  }

}
