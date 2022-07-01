import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-progress-bar",
  templateUrl: "./progress-bar.component.html",
  styleUrls: ["./progress-bar.component.css"],
})
export class ProgressBarComponent implements OnInit {
  @Input() completedTasks: number = 0;
  @Input() totalTasks: number = 0;

  constructor() {}

  ngOnInit(): void {}

  get percentage(): string {
    return `${(this.completedTasks / this.totalTasks) * 100}%`;
  }
}
