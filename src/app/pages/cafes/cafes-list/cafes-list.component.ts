import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CafesService } from '../../../shared/service';
import { Cafe } from '../../../shared/models/cafe';

@Component({
  selector: 'app-cafes-list',
  templateUrl: './cafes-list.component.html',
  styleUrls: ['./cafes-list.component.scss']
})
export class CafesListComponent implements OnInit {
  @Input() cafes: Cafe[] = [];

  constructor(
    public cafesService: CafesService
  ) { }

  ngOnInit() {
  }
}
