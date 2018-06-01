import { Component, OnInit } from '@angular/core';
import { CafesService } from '../../shared/service';
import { Cafe } from '../../shared/models/cafe';
import { Observable, forkJoin } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-cafes',
  templateUrl: './cafes.component.html',
  styleUrls: ['./cafes.component.scss']
})
export class CafesComponent implements OnInit {
  allCafes: Cafe[] = [];
  cafes: Cafe[] = [];
  date = new Date();
  loading = false;

  constructor(
    public cafesService: CafesService
  ) { }

  ngOnInit() {
  }

  getCafesList() {
    this.loading = true;
    this.cafesService.getCafes().subscribe(
      res => {
        forkJoin(res.results.map(cafe => this.cafesService.getCafeDetail(cafe.place_id))).subscribe(
          (cafeDetails: Cafe[]) => {
            this.cafes = cafeDetails.filter(cafe => this.isOpen(cafe));
            this.allCafes = cafeDetails;
            this.loading = false;
          }
        );
      },
      err => {
        console.log(err);
      }
    );
  }

  isOpen(cafe: Cafe) {
    if (cafe.openingHours) {
      const day = this.date.getDay();
      const time = moment(this.date).format('HHmm');
      const periods = cafe.openingHours.periods.filter(p => p.close.day === day);
      return !periods.every(period => period.close.time < time || period.open.time > time);
    }

    return true;
  }

  dateChanged() {
    if (this.allCafes.length) {
      this.cafes = this.allCafes.filter(cafe => this.isOpen(cafe));
    } else {
      this.getCafesList();
    }
  }
}
