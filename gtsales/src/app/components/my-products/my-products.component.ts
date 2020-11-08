import { Component, OnInit, Inject } from "@angular/core";
import { PublicationService } from "../../services/publication.service";
import { Params, ActivatedRoute } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { Publication } from "../../shared/publication";
import { MatDialog } from "@angular/material/dialog";
import { NewProductComponent } from '../new-product/new-product.component';
import { Client } from '../../shared/client';
@Component({
  selector: "app-my-products",
  templateUrl: "./my-products.component.html",
  styleUrls: ["./my-products.component.css"],
})
export class MyProductsComponent implements OnInit {
  publications: Publication[];
  id: string;
  client: Client;
  constructor(
    private publicationService: PublicationService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    @Inject("baseURL") public baseURL
  ) {
    
  }

  newPublication() {
    const dialogRef = this.dialog.open(NewProductComponent, {
      data: this.client['client_id'],
      width: '500px',
      height: '450px'
    });
    dialogRef.afterClosed().subscribe(res => {
      this.activatedRoute.params
      .pipe(
        switchMap((params: Params) =>
          this.publicationService.getPublications(params["id"])
        )
      )
      .subscribe((publications) => {
        this.publications = publications;
        console.log(this.publications);
      });
    })
  }

  ngOnInit(): void {
    this.client = JSON.parse(localStorage['CurrentClient']);
    console.log('ID',this.client['client_id'])
    this.publicationService.getPublications(this.client['client_id']).subscribe((publications) => {
      this.publications = publications;
    });
  }
}
