import { Component, OnInit, Inject } from '@angular/core';
import { Params, ActivatedRoute } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { PublicationService } from "../../services/publication.service";
import { Publication } from "../../shared/publication";
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  publications: Publication[];

  constructor(
    private publicationService: PublicationService,
    private activatedRoute: ActivatedRoute,
    @Inject("baseURL") public baseURL
  ) { 
    let idClient = JSON.parse(localStorage['CurrentClient'])['client_id'];
    this.publicationService.getOthersPublications(idClient).subscribe((publications) => {
      this.publications = publications;
    });
  }

  orderDesc() {
    this.publications = this.publications.sort((n1, n2) => {
      return n1.product_unit_price - n2.product_unit_price
    });

  }

  orderAsc() {
    this.publications = this.publications.sort((n1, n2) => {
      return n2.product_unit_price - n1.product_unit_price
    });
  }

  orderByCategory() {
    this.publications = this.publications.sort(function(a, b){
      if(a.product_category < b.product_category) { return -1; }
      if(a.product_category > b.product_category) { return 1; }
      return 0;
  });
  console.log(this.publications);
  }

  ngOnInit(): void {
  }

}
