import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RolesListComponent } from './roles-list/roles-list.component';
import { RoleDetailComponent } from './role-detail/role-detail.component';

import { RolesRoutingModule } from './roles-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RolesRoutingModule
  ],
  declarations: [
    RolesListComponent,
    RoleDetailComponent
  ],
})
export class RolesModule { }
