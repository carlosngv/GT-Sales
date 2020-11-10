import { Component, OnInit } from '@angular/core';
import { PublicationService } from '../../services/publication.service';
import { Complaint } from '../../shared/complaint';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  complaints: Complaint[];
  constructor(
    private publicationService: PublicationService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.publicationService.getComplaints().subscribe(res => {
      this.complaints = res['complaints'];
      console.log(this.complaints);
    })
  }

  block(value) {
    this.publicationService.blockPublication(value).subscribe(res => {
      console.log(res)
    });

    this.dialog.open(SuccessDialog, {
      width: "250px",
      height: "150px"
    });
  }

  unblock(value) {
    this.publicationService.unblockPublication(value).subscribe(res => {
      console.log(res)
    });

    this.dialog.open(Success2Dialog, {
      width: "250px",
      height: "150px"
    });
  }

}
@Component({
  selector: 'success',
  templateUrl: 'success.html',
})
export class SuccessDialog {

  constructor(
    public dialogRef: MatDialogRef<SuccessDialog>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'success2',
  templateUrl: 'success2.html',
})
export class Success2Dialog {

  constructor(
    public dialogRef: MatDialogRef<Success2Dialog>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

