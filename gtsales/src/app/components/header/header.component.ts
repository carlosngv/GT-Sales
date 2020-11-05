import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Client } from '../../shared/client'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  client: Client;


  constructor(public dialog:MatDialog,
  public authService: AuthService,
  public userService: UserService
  ) {
    
   }

  ngOnInit(): void {
    this.client = JSON.parse(localStorage['CurrentClient']);

  }



  openSignupForm() {
    this.dialog.open(SignupComponent, {
      width: '500px',
      height: '600px'
    })
  }
  openLoginForm() {
    const ref = this.dialog.open(LoginComponent, {
      width: '500px',
      height: '400px'
    });
    ref.afterClosed().subscribe(() => {
      this.client = JSON.parse(localStorage['CurrentClient']);
    })
  }

  logout() {
    this.authService.logout();
  }

  

}
