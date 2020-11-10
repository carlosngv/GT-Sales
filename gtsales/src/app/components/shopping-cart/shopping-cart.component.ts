import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Purchase } from '../../shared/purchase';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { EmailService } from '../../services/email.service';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  purchases: Purchase[]; 
  total: any;
  purchase_id: any;
  client_id: any;
  constructor(
    private cartService: CartService,
    private dialog: MatDialog,
    private emailService: EmailService
  ) { }

  ngOnInit(): void {
    this.client_id = JSON.parse(localStorage['CurrentClient'])['client_id'];
    this.cartService.getPurchases(this.client_id).subscribe((res) => {
      this.purchases = res['purchases'];
      this.purchase_id = this.purchases[0]['purchase_id'];
      console.log(this.purchase_id)
      this.cartService.getTotal(this.purchase_id).subscribe(res => {
        this.total = res['total'];
        console.log(this.total)
      })
    });
  }

  purchase() {
    console.log({
      total: this.total,
      client_id: this.client_id,
      purchase_id: this.purchase_id
    });
      this.cartService.purchaseOrder({
      total: this.total,
      client_id: this.client_id,
      purchase_id: this.purchase_id
    }).subscribe(res => {console.log(res);}); 

    this.dialog.open(SuccessDialog, {
      width: "250px",
      height: "200px"
    });
    let email = JSON.parse(localStorage['CurrentClient'])['client_email'];
    let schema = {
      email : email,
      details: this.purchases,
      total: this.total
    }
    console.log(schema);
    this.emailService.sendOrderEmail(schema).subscribe(res => console.log(res));

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
