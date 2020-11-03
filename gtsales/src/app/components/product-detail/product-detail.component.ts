import { Component, OnInit, Inject, ViewChild } from "@angular/core";
import { PublicationService } from "../../services/publication.service";
import { Params, ActivatedRoute, Router } from "@angular/router";
import { Location } from '@angular/common'
import { switchMap } from "rxjs/operators";
import { Publication } from "../../shared/publication";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Comment } from "../../shared/comment";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.css"],
})
export class ProductDetailComponent implements OnInit {
  publication: Publication;
  commentForm: FormGroup;
  comments: Comment[];
  client_id: number;
  params: number;
  params2: number;

  newComment = {
    publication_comment_content: "",
    client_id: 0,
    publication_detail_id: 0,
  };
  @ViewChild("fform") commentFormDirective;

  constructor(
    private publicationService: PublicationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private location: Location,
    @Inject("baseURL") public baseURL
  ) {
    this.params = this.activatedRoute.snapshot.params.id;
    this.params2 = this.activatedRoute.snapshot.params.pdid;

    this.publicationService.getPublication(this.params).then((res) => {
      this.publication = res;
    });
    this.publicationService.getComments(this.params2).then((res) => {
      this.comments = res['comments'];
    });

    this.createForm();
    let storedUser = JSON.parse(localStorage.getItem("CurrentClient"));
    this.client_id = storedUser["client_id"];
  }

  createForm() {
    this.commentForm = this.fb.group({
      content: [""],
    });
  }

  onSubmit() {
    this.newComment = {
      publication_comment_content: this.commentForm.value.content,
      client_id: this.client_id,
      publication_detail_id: Number(this.publication["publication_detail_id"]),
    };
    console.log(this.newComment);
    this.publicationService.addComment(this.newComment).subscribe((res) => {
      this.publicationService.getComments(this.params2).then((res) => {
        this.comments = res['comments'];
      });
    });
  }

  ngOnInit(): void {}

  goBack() {
    this.location.back();
  }

  likePublication() {
    let updateSchema = {
      likes: this.publication["likes_qty"] + 1,
      dislikes: this.publication["dislikes_qty"],
      publication_id: this.publication["publication_id"],
    };
    this.publicationService
      .updateLikes(updateSchema)
      .subscribe((updatedPublication) => {
        // window.location.reload();
        this.activatedRoute.params
          .pipe(
            switchMap((params: Params) =>
              this.publicationService.getPublication(params["id"])
            )
          )
          .subscribe((publication) => {
            this.publication = publication;
          });
      });
  }

  dislikePublication() {
    let updateSchema = {
      likes: this.publication["likes_qty"],
      dislikes: this.publication["dislikes_qty"] + 1,
      publication_id: this.publication["publication_id"],
    };
    this.publicationService
      .updateLikes(updateSchema)
      .subscribe((updatedPublication) => {
        // window.location.reload();
        this.activatedRoute.params
          .pipe(
            switchMap((params: Params) =>
              this.publicationService.getPublication(params["id"])
            )
          )
          .subscribe((publication) => {
            this.publication = publication;
          });
      });
  }
}
