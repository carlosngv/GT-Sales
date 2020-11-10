import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { catchError,map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseURL';
import { ProcessHttpMsgService } from '../services/process-http-msg.service.service';
import { Publication } from '../shared/publication';
import { Comment } from '../shared/comment';
import { Product } from '../shared/product'; 
import { Complaint } from '../shared/complaint'; 

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
    .pipe(catchError(this.processHttpMsgService.handleError));
  }

  getOthersPublications(id): Observable<Publication[]> {
    return this.http.get<Publication[]>(baseURL + 'publications/others/' + id)
    .pipe(catchError(this.processHttpMsgService.handleError));
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

  newComplaint(newComplaint: Complaint): Observable<Complaint> {
    return this.http.post<Complaint>(baseURL + 'publications/newComplaint', newComplaint)
    .pipe(catchError(this.processHttpMsgService.handleError));
  }

  getComplaints(): Observable<Complaint[]>{
    return this.http.get<Complaint[]>(baseURL + 'publications/complaints/allComplaints')
    .pipe(catchError(this.processHttpMsgService.handleError));
  }

  blockPublication(id): any {
    return this.http.get<any>(baseURL + 'publications/publication/' + id + '/block')
    .pipe(catchError(this.processHttpMsgService.handleError));
  }

  unblockPublication(id): any {
    return this.http.get<any>(baseURL + 'publications/publication/' + id + '/unblock')
    .pipe(catchError(this.processHttpMsgService.handleError));
  }

  newProduct(product: Product): Observable<any> {
    console.log(product);
    const fd = new FormData();
    fd.append('client_id', product.client_id);
    fd.append('product_name', product.product_name);
    fd.append('product_detail', product.product_detail);
    fd.append('product_unit_price', product.product_unit_price);
    fd.append('product_category', product.product_category);
    fd.append('image', product.image);
    return this.http.post(baseURL + 'publications/newPublication', fd)
  }

}
