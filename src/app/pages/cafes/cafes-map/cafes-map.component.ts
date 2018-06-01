import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { CafesService } from '../../../shared/service';
import { Cafe, Location } from '../../../shared/models/cafe';

@Component({
  selector: 'app-cafes-map',
  templateUrl: './cafes-map.component.html',
  styleUrls: ['./cafes-map.component.scss']
})
export class CafesMapComponent implements OnInit {
  @Input() cafes: Cafe[] = [];
  @Output() centerChange: EventEmitter<void> = new EventEmitter();
  center: Location;

  constructor(
    public cafesService: CafesService
  ) { }

  ngOnInit() {
  }

  getIconUrl(placeId: string): string {
    return this.cafesService.isFavorite(placeId) ? 'assets/img/cafe-favorite.png' : 'assets/img/cafe.png';
  }

  dragEnd() {
    if (this.center) {
      this.cafesService.center = this.center;
      this.centerChange.emit();
      this.center = null;
    }
  }

  centerChanged(evt) {
    this.center = {
      latitude: evt.lat,
      longitude: evt.lng
    };
  }
}
