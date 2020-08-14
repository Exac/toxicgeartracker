import { Component, OnInit } from "@angular/core";
import { RosterService } from "./roster.service";
import { GearService } from "./gear.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  name = '';
  server = '';
  player = '';

  constructor(private roster: RosterService, private gear: GearService) {}

  ngOnInit() {
    this.gear.onFetchPlayerGear().subscribe((player) => {
      this.player = this.player + `${JSON.stringify(player)}\n`;
    });
  }

  fetchRoster() {
    this.roster.fetchRoster().subscribe((v: string[]) => console.log(v.sort()));
  }

  fetchGear() {
    this.gear.fetchPlayersGear(this.name, this.server);
  }

  setName(name: string) {
    this.name = name;
  }

  setServer(server: string) {
    this.server = server;
  }
}
