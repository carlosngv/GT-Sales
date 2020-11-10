import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-new-purchase',
  templateUrl: './new-purchase.component.html',
  styleUrls: ['./new-purchase.component.css']
})
export class NewPurchaseComponent implements OnInit {
  qtyForm: FormGroup;
  purchase_id: any;
  constructor(
    private dialogRef: MatDialogRef<NewPurchaseComponent>,
    private fb: FormBuilder,
    private cartService: CartService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.createForm();
  }

  ngOnInit(): void {
    let client_id = JSON.parse(localStorage['CurrentClient'])['client_id'];
    this.cartService.getPurchase(client_id).subscribe(data => {
      this.purchase_id = data['purchase_id'];
      console.log('Purchase ID:', this.purchase_id);
    });
  }
  
  createForm() {
    this.qtyForm = this.fb.group({
      product_qty: [0, Validators.required]
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onSubmit() {
    let product_qty = this.qtyForm.value.product_qty;
    console.log({
      purchase_id: this.purchase_id,
      product_id: this.data,
      product_qty
    });
    this.cartService.purchaseProduct({
      purchase_id: this.purchase_id,
      product_id: this.data,
      product_qty
    }).subscribe(data => {
      console.log(data);
    });
    this.qtyForm.reset();
    this.dialogRef.close();
  }
}
