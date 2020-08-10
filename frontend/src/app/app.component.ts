import { Component } from '@angular/core';
import { RosterService } from './roster.service';
import { GearService } from './gear.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private roster: RosterService,
    private gear: GearService
    ) {
  }

  temporary () {
    this.roster.fetchRoster().subscribe((v:string[]) => console.log(v.sort()));
  }

}
