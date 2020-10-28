import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseURL';
import { ProcessHttpMsgService } from '../services/process-http-msg.service.service';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient, private processHttpMsgService: ProcessHttpMsgService) { }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  })

  sendVerificationEmail(email): Observable<any> {
    return this.http.post<any>(baseURL + 'sendmail', {
      email: email
    }).pipe(catchError(this.processHttpMsgService.handleError));
  }

}
