import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  clientForm: FormGroup;
  client = {
    email: "",
    password: ""
  };

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<LoginComponent>) {
    this.createForm();
  }

  ngOnInit(): void {}

  onSubmit() {
    this.client = this.clientForm.value;
    console.log(this.client)
    this.clientForm.reset();
    this.dialogRef.close(); // Dismiss the component when form is submitted
  }

  createForm() {
    this.clientForm = this.fb.group({
      email:'',
      password:''
    })
  }

}
