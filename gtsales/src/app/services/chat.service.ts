import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { baseURL } from '../shared/baseURL';
import { Observable } from 'rxjs';
import { ChatMessage } from '../shared/chatMessage';
import { HttpClient } from '@angular/common/http';
import { ProcessHttpMsgService } from '../services/process-http-msg.service.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // Connect to server socker.
  private socket:any; 

  constructor(
    private http: HttpClient,
    private processHttpMsgService: ProcessHttpMsgService
  ) { 
    this.socket = io(baseURL);
  }

  getMessages(id): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(baseURL + 'chat/messages/' + id).
    pipe(catchError(this.processHttpMsgService.handleError));
  } 

  newRoom(data): Observable<any> {
    return this.http.post(baseURL + 'chat/newRoom', data).
    pipe(catchError(this.processHttpMsgService.handleError));
  }

  getRoom(data): Observable<any> {
    return this.http.post(baseURL + 'chat/room', data).
    pipe(catchError(this.processHttpMsgService.handleError));
  }

  listen(event: String): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(event, (data) => {
        subscriber.next(data);
      });
    });
  }

  emit(event: string, data) {
    // Listens to event specified within the server.
    this.socket.emit(event, data);
  }

}
