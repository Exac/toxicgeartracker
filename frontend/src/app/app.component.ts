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
    this.roster.fetchGuildLogs().subscribe(value => console.log(value));
  }

}
