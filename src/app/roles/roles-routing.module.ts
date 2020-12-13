import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RolesListComponent } from './roles-list/roles-list.component';
import { RoleDetailComponent } from './role-detail/role-detail.component';

const rolesRoutes: Routes = [
  { path: 'roles', component: RolesListComponent },
  { path: 'role-detail/:roleId', component: RoleDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(rolesRoutes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
