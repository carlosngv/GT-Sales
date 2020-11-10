import { Component, OnInit } from '@angular/core';
import { ReportsService } from "../../services/reports.service";

@Component({
  selector: 'app-top-likes',
  templateUrl: './top-likes.component.html',
  styleUrls: ['./top-likes.component.css']
})
export class TopLikesComponent implements OnInit {

  items: any;

  constructor(private reportsService: ReportsService) { }

  ngOnInit(): void {
    this.reportsService.topDislikes().subscribe((res) => {
      this.items = res["top"];
    });
  }

}
