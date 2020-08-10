import { inject, TestBed } from '@angular/core/testing';

import { RosterService } from './roster.service';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';

describe('RosterService', () => {
  let service: RosterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RosterService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(RosterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch the most recent raid logs from warcraftlogs', inject([HttpTestingController, RosterService], (httpMock: HttpTestingController, service: RosterService) => {
    // We call the service
    service.fetchRoster().subscribe();

    // We expect the httpMock to have been called a certain way.
    const requestGuildLogs = httpMock.expectOne('https://classic.warcraftlogs.com/v1/reports/user/pronator?api_key=688e15caae84a659990c486a78fc6383');
    expect(requestGuildLogs.request.method).toEqual('GET');
    // Then we set the fake data to be returned by the mock
    requestGuildLogs.flush([{id: 'hqFJYGZ4B9KRQCyz'}, {id: 'QLYFabJkWDfqCzn3',}, {id: 'PAOsoadoaodpasd6',}]);

    // Expect three requests for each of the 3 logs we mocked:
    const requestPlayers: TestRequest[] = httpMock.match('https://.*.warcraftlogs.com:443/v1/report/fights/.*?api_key=.*');
    requestPlayers.forEach(req => expect(req.request.method).toEqual('GET'));
    requestPlayers.forEach(req => req.flush({'exportedCharacters': [{name: 'Exac'}, {name: 'Epuration'}]}));
  }));
});
