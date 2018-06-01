import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientMock } from '../../_mock-backend/http/http-client.mock';
import { CafesService } from './cafes.service';
import { Cafe, Location } from '../models/cafe';

describe('CafesService', () => {
  let cafesService: CafesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        CafesService,
        { provide: HttpClient, useClass: HttpClientMock }
      ]
    });
  });

  beforeEach(() => {
    cafesService = TestBed.get(CafesService);
  });

  it('should be created', inject([CafesService], (service: CafesService) => {
    expect(service).toBeTruthy();
  }));

  it('#set and get center should work', (() => {
    cafesService.center = {
      latitude: 100,
      longitude: 100
    };

    expect(cafesService.center).toEqual({
      latitude: 100,
      longitude: 100
    });
  }));

  it('#getCafes should return a list of cafes with the correct number of items', (() => {
    cafesService.getCafes().subscribe(cafes => {
      expect(cafes.length).toEqual(2);
    });
  }));

  it('#getCafeDetail should return the details of right cafe', (() => {
    cafesService.getCafeDetail('ChIJ1-v38TauEmsRHbUt24abGq8').subscribe(
      detail => {
        expect(detail.name === 'Lobby Lounge');
      }
    );
  }));

  it('#likeCafe should work', (() => {
    cafesService.favoriteCafes = [];
    cafesService.likeCafe('MOCK_PLACE');
    expect(cafesService.favoriteCafes.indexOf('MOCK_PLACE')).toBeGreaterThan(-1);
    cafesService.likeCafe('MOCK_PLACE');
    expect(cafesService.favoriteCafes.indexOf('MOCK_PLACE')).toEqual(-1);
  }));

  it('#isFavorite should work', (() => {
    cafesService.favoriteCafes = [];
    cafesService.likeCafe('MOCK_PLACE');
    expect(cafesService.isFavorite('MOCK_PLACE')).toEqual(true);
    cafesService.likeCafe('MOCK_PLACE');
    expect(cafesService.isFavorite('MOCK_PLACE')).toEqual(false);
  }));
});
