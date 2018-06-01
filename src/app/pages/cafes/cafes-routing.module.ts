import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CafesComponent } from './cafes.component';

const routes: Routes = [
  { path: '', component: CafesComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CafesRoutingModule { }
