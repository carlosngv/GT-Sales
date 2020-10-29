import { Component, OnInit, Inject } from '@angular/core';
import { PublicationService } from '../../services/publication.service';
import { Params, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Publication } from '../../shared/publication';
@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css']
})
export class MyProductsComponent implements OnInit {

  publications: Publication[];

  constructor(private publicationService: PublicationService,
    private activatedRoute: ActivatedRoute,
    @Inject('baseURL') public baseURL
    ) { 
      this.activatedRoute.params.pipe(switchMap((params: Params) => this.publicationService.getPublications(params['id'])))
      .subscribe(publications => {
      this.publications = publications;
      console.log(this.publications);
    })
    }

  ngOnInit(): void {
  }

}
