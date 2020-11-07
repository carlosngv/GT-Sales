import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PublicationService } from '../../services/publication.service';
import { Complaint } from '../../shared/complaint';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-complaint-form',
  templateUrl: './complaint-form.component.html',
  styleUrls: ['./complaint-form.component.css']
})
export class ComplaintFormComponent implements OnInit {
  
  complaintForm: FormGroup;
  newComplaint: Complaint;
  client_id: any;
  @ViewChild("fform") complaintFormDirective;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ComplaintFormComponent>,
    private publicationService: PublicationService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.createForm();
    this.client_id = JSON.parse(localStorage['CurrentClient'])['client_id'];
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  createForm() {
    this.complaintForm = this.fb.group({
      complaint_description: ["", Validators.required]
    });
  }

  onSubmit() {
    let currentDescription = this.complaintForm.value.complaint_description;
    this.newComplaint = {
      complaint_description: currentDescription,
      client_id: this.client_id,
      publication_id: this.data
    }
    console.log(this.newComplaint);
    this.publicationService.newComplaint(this.newComplaint).subscribe((data) => {
      console.log(data);
    });
    //this.dialogRef.close();
  }

}
