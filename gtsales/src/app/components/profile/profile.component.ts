import { Component, OnInit, ViewChild,OnDestroy, Inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from '../../shared/client';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

interface htmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  client: Client;
  clientAux: Client;
  file: File;
  photoSelected: string | ArrayBuffer;
  clientForm: FormGroup;
  @ViewChild('fform') clientFormDirective;
  mediaSub: Subscription;
  deviceXS: boolean;
  value: number = 40;
  constructor(
    private userService: UserService,
    public mediaObserver: MediaObserver,
    private fb: FormBuilder,
    @Inject('baseURL') public baseURL
  ) { 
    
  }

  ngOnInit(): void {
    this.clientAux = JSON.parse(localStorage['CurrentClient']);
    this.userService.getUser(this.clientAux['client_id']).subscribe((user) => {
      this.client = user;
      this.createForm();
    });
    this.mediaSub = this.mediaObserver.media$.subscribe((result:MediaChange) => {
      console.log(result.mqAlias);
      this.deviceXS = result.mqAlias === 'xs' ? true : false;
      if(this.deviceXS) {
        this.value = 100;
      }
        else if (result.mqAlias === 'sm') {
          this.value = 70;
      } else {
        this.value = 40;
      }
    });
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
    });
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
  ngOnDestroy(){
    this.mediaSub.unsubscribe();
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
