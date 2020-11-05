import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseURL';
import { Client } from '../shared/client';
import { ProcessHttpMsgService } from '../services/process-http-msg.service.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private processHttpMsgService: ProcessHttpMsgService) {}

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  })

  getUsers(): Observable<Client[]> {
    return this.http.get<Client[]>(baseURL + 'clients/allClients')
    .pipe(catchError(this.processHttpMsgService.handleError));
  }
  
  getUser(id): Observable<Client> {
    return this.http.get<Client>(baseURL + 'clients/'+id)
    .pipe(catchError(this.processHttpMsgService.handleError));
  }

  createUser(client: Client) {
    return this.http.post(baseURL + 'clients/newClient', client)
    .pipe(catchError(this.processHttpMsgService.handleError));
  }

  updateUser(client: Client){
    const fd = new FormData();
    fd.append('client_name', client.client_name);
    fd.append('client_lastname', client.client_lastname);
    fd.append('client_username', client.client_username);
    fd.append('client_password', client.client_password);
    fd.append('client_email', client.client_email);
    fd.append('client_birthday', client.client_birthday);
    fd.append('image', client.image);
    fd.append('client_country', client.client_country);
    return this.http.patch(baseURL + 'clients/updateClient', fd)
    .pipe(catchError(this.processHttpMsgService.handleError));
  }

}
