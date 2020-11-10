import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { catchError,map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseURL';
import { ProcessHttpMsgService } from '../services/process-http-msg.service.service';
@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient, private processHttpMsgService: ProcessHttpMsgService) { }

  topComplaints(): Observable<any> {
    return this.http.get<any>(baseURL + 'reports/topComplaints')
    .pipe(catchError(this.processHttpMsgService.handleError));
  }

  topCredits(): Observable<any> {
    return this.http.get<any>(baseURL + 'reports/topCredits')
    .pipe(catchError(this.processHttpMsgService.handleError));
  }

  topLikes(): Observable<any> {
    return this.http.get<any>(baseURL + 'reports/topLikes')
    .pipe(catchError(this.processHttpMsgService.handleError));
  }

  topDislikes(): Observable<any> {
    return this.http.get<any>(baseURL + 'reports/topDislikes')
    .pipe(catchError(this.processHttpMsgService.handleError));
  }

  topPublications(): Observable<any> {
    return this.http.get<any>(baseURL + 'reports/topPublications')
    .pipe(catchError(this.processHttpMsgService.handleError));
  }

}
