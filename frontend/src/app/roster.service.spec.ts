import { inject, TestBed } from '@angular/core/testing';

import { RosterService } from './roster.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

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
    service.fetchGuildLogs().subscribe((roster: string[]) => {
      expect(roster.length).toBeGreaterThan(0);
    });

    // We expect the httpMock to have been called a certain way.
    const req = httpMock.expectOne('https://classic.warcraftlogs.com/v1/reports/user/pronator?api_key=688e15caae84a659990c486a78fc6383');
    expect(req.request.method).toEqual('GET');

    // Then we set the fake data to be returned by the mock
    req.flush([
      {
        id: 'hqFJYGZ4B9KRQCyz',
        title: 'MC Alt Raid',
        owner: 'pronator',
        start: 1596167134813,
        end: 1596173775059,
        zone: 1000
      },
      {
        id: 'QLYFabJkWDfqCzn3',
        title: 'BWL\/MC Alt Raid',
        owner: 'pronator',
        start: 1596161427584,
        end: 1596165805135,
        zone: 1002
      },
      {
        id: 'PAOsoadoaodpasd6',
        title: 'BWL',
        owner: 'pronator',
        start: 1596161427584,
        end: 1596165805135,
        zone: 1001
      }]);

  }));
});
