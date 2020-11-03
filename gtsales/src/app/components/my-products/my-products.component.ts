import { Component, OnInit, Inject } from "@angular/core";
import { PublicationService } from "../../services/publication.service";
import { Params, ActivatedRoute } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { Publication } from "../../shared/publication";
import { MatDialog } from "@angular/material/dialog";
import { NewProductComponent } from '../new-product/new-product.component';
@Component({
  selector: "app-my-products",
  templateUrl: "./my-products.component.html",
  styleUrls: ["./my-products.component.css"],
})
export class MyProductsComponent implements OnInit {
  publications: Publication[];
  id: string;
  constructor(
    private publicationService: PublicationService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    @Inject("baseURL") public baseURL
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
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
  }

  newPublication() {
    const dialogRef = this.dialog.open(NewProductComponent, {
      data: this.id,
      width: '500px',
      height: '420px'
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

  ngOnInit(): void {}
}
