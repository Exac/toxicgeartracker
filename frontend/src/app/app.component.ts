import { Component } from '@angular/core';
import { RosterService } from './roster.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private roster: RosterService) {
  }

  temporary () {
    this.roster.fetchRoster().subscribe((v:string[]) => console.log(v.sort()));
  }

}
