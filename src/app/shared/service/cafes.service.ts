import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs';
import { Cafe, Location } from '../models/cafe';

@Injectable({
  providedIn: 'root'
})
export class CafesService {
  public favoriteCafes: string[] = [];
  private _center: Location = {
    latitude: 0,
    longitude: 0
  };

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorage
  ) {
    this.localStorage.getItem('favoritecafes').subscribe(
      items => {
        this.favoriteCafes = items || [];
      }
    );

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        this._center = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        };
      }, () => {
        this._center = {
          latitude: -33.8670,
          longitude: 151.1957
        };
      });
    } else {
      this._center = {
        latitude: -33.8670,
        longitude: 151.1957
      };
    }
  }

  get center(): Location {
    return this._center;
  }

  set center(value: Location) {
    this._center.latitude = value.latitude;
    this._center.longitude = value.longitude;
  }

  isFavorite(placeId: string): boolean {
    return this.favoriteCafes.indexOf(placeId) > -1;
  }

  likeCafe(placeId: string) {
    const placeIdx = this.favoriteCafes.indexOf(placeId);
    placeIdx === -1 ? this.favoriteCafes.push(placeId) : this.favoriteCafes.splice(placeIdx, 1);
    this.localStorage.setItemSubscribe('favoritecafes', this.favoriteCafes);
  }

  getCafes(): Observable<any> {
    return this.http.get('/map-api/maps/api/place/nearbysearch/json',
      {
        params: {
          location: `${this._center.latitude},${this._center.longitude}`,
          radius: '500',
          types: 'cafe',
          key: environment.googleApiKey
        }
      }
    );
  }

  getCafeDetail(placeId: string): Observable<Cafe> {
    return this.http.get('/map-api/maps/api/place/details/json', {
      params: {
        place_id: placeId,
        key: environment.googleApiKey
      }
    }).pipe(
      map((cafe: any): Cafe => {
        return {
          name: cafe.result.name,
          placeId: cafe.result.place_id,
          location: {
            latitude: cafe.result.geometry.location.lat,
            longitude: cafe.result.geometry.location.lng
          },
          openingHours: cafe.result.opening_hours
        };
      })
    );
  }
}
