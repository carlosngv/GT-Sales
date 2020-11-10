import { Component, OnInit } from '@angular/core';
import { ReportsService } from "../../services/reports.service";

@Component({
  selector: 'app-top-publications',
  templateUrl: './top-publications.component.html',
  styleUrls: ['./top-publications.component.css']
})
export class TopPublicationsComponent implements OnInit {
  items:any;
  constructor(private reportsService: ReportsService) { }

  ngOnInit(): void {
    this.reportsService.topPublications().subscribe(res => {
      this.items = res['top'];
    });
  }

}
