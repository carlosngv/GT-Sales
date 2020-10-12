import { Component, OnInit,ViewChild, Inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { switchMap, switchMapTo } from 'rxjs/operators';
import { Client } from '../../shared/client';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {baseURL } from '../../shared/baseURL'

interface htmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  clientForm: FormGroup;
  client: Client;
  file: File;
  photoSelected: string | ArrayBuffer;
  @ViewChild('fform') clientFormDirective;


  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    @Inject('baseURL') public baseURL
  ) { 
    this.activatedRoute.params.pipe(switchMap((params: Params) => this.userService.getUser(params['id'])))
    .subscribe(client => {
      console.log("PARAMS",client)
      this.client = client;
      console.log(baseURL + client['client_profile_picture'])
      this.createForm();
    })
  }

  ngOnInit(): void {
    
  }

  createForm() {
    this.clientForm = this.fb.group({
      firstname: [this.client['client_name'], Validators.required],
      lastname: [this.client['client_lastname'], Validators.required],
      username: [this.client['client_username'], Validators.required],
      password: [this.client['client_password'], Validators.required],
      email: [this.client['client_email'], Validators.required],
      birthday: [(this.client['client_birthday']), Validators.required],
      country: [this.client['client_country'], Validators.required],
      credits: [this.client['client_credits_qty']]
    })
  }

  onPhoto(event: htmlInputEvent) {
    if(event.target.files && event.target.files[0]){
      this.file = <File>event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        this.photoSelected = reader.result;
      }
      console.log(this.file)
      reader.readAsDataURL(this.file);
      console.log(this.file)
    }
  }

  onSubmit() {
    this.client = {
      client_name: this.clientForm.value.firstname,
      client_lastname : this.clientForm.value.lastname,
      client_username: this.clientForm.value.username,
      client_password: this.clientForm.value.password,
      client_email: this.clientForm.value.email,
      client_birthday: this.clientForm.value.birthday,
      image: this.file,
      client_country: this.clientForm.value.country
    }
    this.userService.updateUser(this.client).subscribe(res => {
      console.log(res);
    })
  }

}
