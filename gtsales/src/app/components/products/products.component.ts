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
    console.log('client_id',idClient)
    this.publicationService.getOthersPublications(idClient).subscribe((publications) => {
      this.publications = publications;
    });
  }

  ngOnInit(): void {
  }

}
