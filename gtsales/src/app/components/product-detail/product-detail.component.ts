import { Component, OnInit, Inject } from '@angular/core';
import { PublicationService } from '../../services/publication.service';
import { Params, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Publication } from '../../shared/publication';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  publication: Publication;
  constructor(  
    private publicationService: PublicationService,
    private activatedRoute: ActivatedRoute,
    @Inject('baseURL') public baseURL
  ) { 
    this.activatedRoute.params.pipe(switchMap((params: Params) => this.publicationService.getPublication(params['id'])))
      .subscribe(publication => {
      this.publication = publication;
      console.log(this.publication);
      });
  }


  ngOnInit(): void {
  }

}
