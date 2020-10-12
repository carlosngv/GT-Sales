import { Component, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('fform') clientFormDirective;


  constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<SignupComponent>) { 
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.clientForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      birthday: ['', Validators.required],
      country: ['', Validators.required],
    })
  }
  onSubmit() {
    this.client = {
      client_name: this.clientForm.value.firstname,
      client_lastname : this.clientForm.value.lastname,
      client_username: this.clientForm.value.username,
      client_password: this.clientForm.value.password,
      client_email: this.clientForm.value.email,
      client_birthday: this.clientForm.value.birthday,
      client_country: this.clientForm.value.country
    }
    console.log(this.client)
    this.clientForm.reset({
      firstname: '',
      lastname: '',
      username: '',
      password: '',
      email: '',
      birthday: '',
      country: '',
    });
    this.clientFormDirective.resetForm();
    this.dialogRef.close(); // Dismiss the component when form is submitted
  }

}
