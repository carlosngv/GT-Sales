import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Client } from "../../shared/client";
import { Router } from "@angular/router";
import { LoginValidationComponent } from "../login-validation/login-validation.component";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  clientForm: FormGroup;
  clientLog = {
    email: "",
    password: "",
  };

  clients: Client[];
  client: Client;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<LoginComponent>,
    private authService: AuthService,
    private router: Router,
    @Inject("baseURL") private baseURL
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  login(client_email, client_password) {
    this.authService.login(client_email, client_password).subscribe((res) => {
      if (res["msg"] == "true") {
        this.client = res["client"];
        console.log("CLIENT",this.client)
        if (this.client["client_verified"] == "false") {
          console.log('false');
          this.dialog.open(LoginValidationComponent, {
            width: "350px",
            height: "220px",
          });
          return;
        }
        console.log('CLIENT ID:',this.client["client_id"]);
        this.router.navigate(["profile", '']);
        this.authService.storeUser(this.client);
        console.log(this.client["client_id"]);
      } else {
        console.log('false');
          this.dialog.open(LoginValidationComponent, {
            width: "350px",
            height: "220px",
          });
          return;
        console.log("no ok");
      }
    });
  }

  onSubmit() {
    this.clientLog = this.clientForm.value;
    this.login(this.clientLog.email, this.clientLog.password);
    this.clientForm.reset();
    this.dialogRef.close(); // Dismiss the component when form is submitted
  }

  createForm() {
    this.clientForm = this.fb.group({
      email: "",
      password: "",
    });
  }
}
