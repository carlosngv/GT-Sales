import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Client } from "../../shared/client";
import { MatDialogRef, MatDialog } from "@angular/material/dialog";
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";
import { EmailVerificationComponent } from "../email-verification/email-verification.component";
import { EmailService } from "../../services/email.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  clientForm: FormGroup;
  client: Client;
  @ViewChild("fform") clientFormDirective;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SignupComponent>,
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog,
    private emailService: EmailService
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  createForm() {
    this.clientForm = this.fb.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      username: ["", Validators.required],
      password: ["", Validators.required],
      email: ["", Validators.required],
      birthday: ["", Validators.required],
      country: ["", Validators.required],
    });
  }
  onSubmit() {
    this.client = {
      client_name: this.clientForm.value.firstname,
      client_lastname: this.clientForm.value.lastname,
      client_username: this.clientForm.value.username,
      client_password: this.clientForm.value.password,
      client_email: this.clientForm.value.email,
      client_birthday: this.clientForm.value.birthday,
      client_country: this.clientForm.value.country,
    };
    console.log(this.client);
    this.userService.createUser(this.client).subscribe((res) => {
      this.emailService.sendVerificationEmail(res["client_email"]).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
    });
    this.clientForm.reset({
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      email: "",
      birthday: "",
      country: "",
    });
    this.dialog.open(EmailVerificationComponent, {
      width: "500px",
      height: "220px",
    });
    this.clientFormDirective.resetForm();
    this.dialogRef.close(); // Dismiss the component when form is submitted */
  }
}
