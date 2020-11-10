import { Component, OnInit } from "@angular/core";
import { ReportsService } from "../../services/reports.service";
@Component({
  selector: "app-top-complaints",
  templateUrl: "./top-complaints.component.html",
  styleUrls: ["./top-complaints.component.css"],
})
export class TopComplaintsComponent implements OnInit {
  items: any;

  constructor(private reportsService: ReportsService) {}

  ngOnInit(): void {
    this.reportsService.topComplaints().subscribe(res => {
      this.items = res['top'];
    });
  }
}
