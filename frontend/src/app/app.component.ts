import { Component, OnInit } from "@angular/core";
import { RosterService } from "./roster.service";
import { GearService } from "./gear.service";
import { DatabaseService } from "./database.service";
import { Equips, Item } from 'toxicgeartracker-shared';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  name = "";
  server = "";
  player = "";
  csv = "";

  constructor(
    private roster: RosterService,
    private gear: GearService,
    private db: DatabaseService
  ) {}

  ngOnInit() {
    this.gear.onFetchPlayerGear().subscribe(player => {
      this.player = this.player + `${JSON.stringify(player)}\n`;
    });
  }

  fetchRoster() {
    this.roster.fetchRoster().subscribe((v: string[]) => {
      console.log(v.sort());
      v.forEach(name => this.gear.fetchPlayersGear(name, "Fairbanks"));
    });
  }

  fetchGear() {
    this.gear.fetchPlayersGear(this.name, this.server);
  }

  clearDatabase() {
    this.db.clear();
  }

  setName(name: string) {
    this.name = name;
  }

  setServer(server: string) {
    this.server = server;
  }

  generateCSV() {
    let csv =
      "name,class,item,\n";
    for (const [n, p] of this.db.getAllPlayers()) {
      Object.entries(p.wearing).map(([slot,item]) => item.map((i: Item) => csv += `${p.name},${p.spec},${i.name},\n`));
    }
    this.csv = csv;
  }
}
