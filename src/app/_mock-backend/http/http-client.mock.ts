import { HttpParams } from '@angular/common/http/src/params';
import { HttpHeaders } from '@angular/common/http/src/headers';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { CafesDetailsMock, CafesMock } from '../_db';

enum RequestType {
  NearbySearch,
  Details
}

interface DBConnection {
  db: any;
  type: RequestType;
}

export class HttpClientMock {

  static router(url: string): DBConnection {
    if (url.includes('maps/api/place/nearbysearch')) {
      return { db: CafesMock, type: RequestType.NearbySearch };
    } else if (url.includes('maps/api/place/details')) {
      return { db: CafesDetailsMock, type: RequestType.Details };
    }
  }

  get(url, options: { params }) {
    let response = null;
    if (HttpClientMock.router(url).type === RequestType.NearbySearch) {
      response = HttpClientMock.router(url).db;
    } else if (HttpClientMock.router(url).type === RequestType.Details) {
      response = HttpClientMock.router(url).db.find(cafe => cafe.place_id === options.params.place_id);
    }

    return of(response).pipe( delay(3000) );
  }
}
