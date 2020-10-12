import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { baseURL } from "../shared/baseURL";
import { ProcessHttpMsgService } from "../services/process-http-msg.service.service";
import { Client } from "../shared/client";
import { isNullOrUndefined } from "util";
import { Router } from "@angular/router";
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private processHttpMsgService: ProcessHttpMsgService,
    private router: Router
  ) {} 
  
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  })

  // Stores user into localstorage
  storeUser(client: Client) {
    let clientString = JSON.stringify(client);
    localStorage.setItem("CurrentClient", clientString);
  }

  getStoredUser(): Observable<any> {
    let storedUser = localStorage.getItem("CurrentClient");
    if (!isNullOrUndefined(storedUser)) {
      let userJson = JSON.parse(storedUser);
      return userJson;
    } else {
      return null;
    }
  }

  isLogged(): boolean {
    let storedUser = localStorage.getItem("CurrentClient");
    if (!isNullOrUndefined(storedUser)) {
      return true;
    } else {
      return false;
    }
  }

  // Login

  login(clientEmail, clientPassword) {
    return this.http.post(baseURL +'clients/signIn', {
      client_email: clientEmail,
      client_password: clientPassword
    }, { headers: this.headers })
    .pipe(map((client) => client))
    .pipe(catchError(this.processHttpMsgService.handleError));
  }

  // Logout
  logout() {
    localStorage.removeItem("CurrentClient");
    this.router.navigate(['/home']);
  }
}
