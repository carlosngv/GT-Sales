import { Component, OnInit } from "@angular/core";
import { ReportsService } from "../../services/reports.service";

@Component({
  selector: "app-top-dislikes",
  templateUrl: "./top-dislikes.component.html",
  styleUrls: ["./top-dislikes.component.css"],
})
export class TopDislikesComponent implements OnInit {
  schemas: any;

  constructor(private reportsService: ReportsService) {}

  ngOnInit(): void {
    this.reportsService.topDislikes().subscribe((res) => {
      this.schemas = res["top"];
    });
  }
}
