import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { catchError,map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseURL';
import { ProcessHttpMsgService } from '../services/process-http-msg.service.service';
import { Publication } from '../shared/publication';
import { Comment } from '../shared/comment';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  constructor(private http: HttpClient, private processHttpMsgService: ProcessHttpMsgService) { }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  })

  getPublications(id): Observable<Publication[]> {
    return this.http.get<Publication[]>(baseURL + 'publications/' + id)
    .pipe(catchError(this.processHttpMsgService.handleError)); // converted to a promise
  }

  async getPublication(publicationID) {
    return await this.http.get<Publication>(baseURL + 'publications/publication/' + publicationID).toPromise();
  }

  updateLikes(updateJson) {
    return this.http.patch(baseURL + 'publications/publication/updateLikes', updateJson)
    .pipe(catchError(this.processHttpMsgService.handleError));
  }

  async getComments(id) {
     return  await this.http.get<Comment[]>(baseURL + 'publications/publication/' + id + '/comments').toPromise();
  }

  addComment(comment): Observable<any> {
    return this.http.post(baseURL + 'publications/publication/addComment', comment)
    .pipe(catchError(this.processHttpMsgService.handleError));
  }


}
