import { Component, OnInit, Inject, ViewChild } from "@angular/core";
import { PublicationService } from "../../services/publication.service";
import { ChatService } from "../../services/chat.service";
import { UserService } from "../../services/user.service";
import { Params, ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { switchMap } from "rxjs/operators";
import { Publication } from "../../shared/publication";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Comment } from "../../shared/comment";
import { Client } from "../../shared/client";
import { MatDialog } from "@angular/material/dialog";
import { ChatComponent } from "../chat/chat.component";
import { ComplaintFormComponent } from "../complaint-form/complaint-form.component";
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
  publication_detail_id: number;
  client: Client;

  newComment = {
    publication_comment_content: "",
    client_id: 0,
    publication_detail_id: 0,
  };
  @ViewChild("fform") commentFormDirective;

  constructor(
    private publicationService: PublicationService,

    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private location: Location,
    private userService: UserService,
    private dialog: MatDialog,
    private chatService: ChatService,
    @Inject("baseURL") public baseURL
  ) {
    this.params = this.activatedRoute.snapshot.params.id;
    this.publication_detail_id = this.activatedRoute.snapshot.params.pdid;

    this.publicationService.getPublication(this.params).then((res) => {
      this.publication = res;
      this.userService
        .getUser(this.publication["client_id"])
        .subscribe((res) => {
          this.client = res;
        });
    });
    this.publicationService.getComments(this.publication_detail_id).then((res) => {
      this.comments = res["comments"];
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

  openChat() {
    console.log(this.client_id, this.client["client_id"]);
    this.chatService
      .newRoom({
        client_one: this.client_id,
        client_two: this.client["client_id"],
      })
      .subscribe((res) => console.log(res));

    this.dialog.open(ChatComponent, {
      width: "420px",
      height: "480px",
      data: {
        client_id: this.client_id,
        vendor_id: this.publication["client_id"],
        client_two: this.client["client_id"],
      },
    });
  }

  newComplaint() {
    this.dialog.open(ComplaintFormComponent, {
      data: this.params,
      width: "300px",
      height: "380px"
    })
  }

  onSubmit() {
    this.newComment = {
      publication_comment_content: this.commentForm.value.content,
      client_id: this.client_id,
      publication_detail_id: Number(this.publication["publication_detail_id"]),
    };
    this.publicationService.addComment(this.newComment).subscribe((res) => {
      this.publicationService.getComments(this.publication_detail_id).then((res) => {
        this.comments = res["comments"];
      });
    });
    this.commentForm.reset();
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
