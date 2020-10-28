import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseURL';
import { ProcessHttpMsgService } from '../services/process-http-msg.service.service';
import { Publication } from '../shared/publication';
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

  getPublication(publicationID) {
    return this.http.get<Publication>(baseURL + 'publications/publication/' + publicationID)
    .pipe(catchError(this.processHttpMsgService.handleError));
  }


}
