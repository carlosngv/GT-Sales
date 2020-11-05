import { Component, OnInit, ViewChild,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Product } from '../../shared/product';
import { MatDialogRef, MatDialog } from "@angular/material/dialog";
import { PublicationService } from '../../services/publication.service';
import {  ActivatedRoute } from "@angular/router";
import {MAT_DIALOG_DATA} from '@angular/material/dialog';


interface htmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  photoSelected: string | ArrayBuffer;
  productForm: FormGroup;
  product: Product;
  file: File;

  @ViewChild("fform") productFormDirective;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NewProductComponent>,
    private publicationService: PublicationService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createForm();
   }

  ngOnInit(): void {
    console.log(this.data)
  }
  
  createForm() {
    this.productForm = this.fb.group({
      product_name: ['', Validators.required],
      product_detail: ['', Validators.required],
      product_unit_price: [0, Validators.required],
      product_category: ['', Validators.required]
    })
  }

  onPhoto(event: htmlInputEvent) {
    if(event.target.files && event.target.files[0]){
      this.file = <File>event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        this.photoSelected = reader.result;
      }
      reader.readAsDataURL(this.file);
      console.log(this.file)
    }
  }

  onSubmit() {
    this.product = {
      client_id: this.data,
      product_name: this.productForm.value.product_name,
      product_detail: this.productForm.value.product_detail,
      product_unit_price: this.productForm.value.product_unit_price,
      product_category: this.productForm.value.product_category,
      image: this.file
    }
    this.publicationService.newProduct(this.product).subscribe(res => {
      console.log(res);
    })
    this.productForm.reset();
  }

}
