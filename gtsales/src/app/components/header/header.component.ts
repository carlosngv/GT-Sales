import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog:MatDialog) { }

  ngOnInit(): void {
  }

  openSignupForm() {
    this.dialog.open(SignupComponent, {
      width: '500px',
      height: '600px'
    })
  }
  openLoginForm() {
    this.dialog.open(LoginComponent, {
      width: '500px',
      height: '400px'
    })
  }

}
