import { Component, OnInit } from '@angular/core';
import { ReportsService } from "../../services/reports.service";

@Component({
  selector: 'app-topt-credits',
  templateUrl: './topt-credits.component.html',
  styleUrls: ['./topt-credits.component.css']
})
export class ToptCreditsComponent implements OnInit {
  items: any;

  constructor(private reportsService: ReportsService) { }

  ngOnInit(): void {
    this.reportsService.topCredits().subscribe(res => {
      this.items = res['top'];
    });
  }

}
