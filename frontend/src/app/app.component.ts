import { Component, OnInit } from '@angular/core';
import { RosterService } from './roster.service';
import { GearService } from './gear.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private roster: RosterService,
    private gear: GearService
    ) {
  }

  ngOnInit() {
    this.gear.onFetchPlayerGear().subscribe(player => {
      console.log('player gear fetched:', { player });
    });
  }

  fetchRoster () {
    this.roster.fetchRoster().subscribe((v:string[]) => console.log(v.sort()));
  }
  fetchGear () {
    this.gear.fetchPlayersGear('Exac');
  }


}
