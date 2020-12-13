import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AreasListComponent } from './areas-list/areas-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: 'areas', component: AreasListComponent },
  { path: '', redirectTo: '/roles', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
