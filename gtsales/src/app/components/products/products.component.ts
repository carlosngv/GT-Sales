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
    this.activatedRoute.params
      .pipe(
        switchMap((params: Params) =>
          this.publicationService.getOthersPublications(params["id"])
        )
      )
      .subscribe((publications) => {
        this.publications = publications;
        console.log(this.publications);
      });
  }

  ngOnInit(): void {
  }

}
