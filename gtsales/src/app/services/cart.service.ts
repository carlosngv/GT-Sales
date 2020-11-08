import { Injectable } from '@angular/core';
import { ProcessHttpMsgService } from '../services/process-http-msg.service.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseURL';
import { Purchase } from '../shared/purchase';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient, private processHttpMsgService: ProcessHttpMsgService) { }

  getPurchases(id: any): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(baseURL + 'cart/clientPurchases/' + id)
    .pipe(catchError(this.processHttpMsgService.handleError));
  }

}
