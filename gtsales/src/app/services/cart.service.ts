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

  newPurchase(data: any): Observable<any> {
    return this.http.post(baseURL + 'cart/newPurchase', data)
    .pipe(catchError(this.processHttpMsgService.handleError));
  }

  purchaseProduct(data: any): Observable<any> {
    return this.http.post(baseURL + 'cart/purchaseProduct', data)
    .pipe(catchError(this.processHttpMsgService.handleError));
  }

  getPurchase(id: any): Observable<any> {
    return this.http.get<any>(baseURL + 'cart/purchase/' + id)
    .pipe(catchError(this.processHttpMsgService.handleError));
  }

  getTotal(id:any) {
    return this.http.get<any>(baseURL + 'cart/purchaseTotal/' + id)
    .pipe(catchError(this.processHttpMsgService.handleError));
  }


  purchaseOrder(data: any) {
    return this.http.patch<any>(baseURL + 'cart/purchaseOrder', data)
    .pipe(catchError(this.processHttpMsgService.handleError));
  }

}
