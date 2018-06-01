import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CafesRoutingModule } from './cafes-routing.module';
import { CafesComponent } from './cafes.component';
import { CafesListComponent } from './cafes-list/cafes-list.component';
import { CafesMapComponent } from './cafes-map/cafes-map.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    CafesRoutingModule,
    SharedModule
  ],
  declarations: [CafesComponent, CafesListComponent, CafesMapComponent]
})
export class CafesModule { }
