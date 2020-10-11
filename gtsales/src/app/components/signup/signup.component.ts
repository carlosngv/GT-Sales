import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from '../../shared/client';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  clientForm: FormGroup;
  client: Client;

  constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<SignupComponent>) { 
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.clientForm = this.fb.group({
      firstname: '',
      lastname: '',
      username: '',
      password: '',
      email: '',
      birthday: '',
      country: '',
    })
  }
  onSubmit() {
    this.client = {
      firstname: this.clientForm.value.firstname,
      lastname : this.clientForm.value.lastname,
      username: this.clientForm.value.username,
      password: this.clientForm.value.password,
      email: this.clientForm.value.email,
      birthday: this.clientForm.value.birthday,
      country: this.clientForm.value.country
    }
    console.log(this.client)
    this.clientForm.reset();
    this.dialogRef.close(); // Dismiss the component when form is submitted
  }

}
