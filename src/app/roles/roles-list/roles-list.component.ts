import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { Role } from '../../models/role';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.css']
})
export class RolesListComponent implements OnInit {
  
  roles$: Observable<Role[]>;
  selectedId: string;

  constructor(
    private roleService: RoleService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.getRolesList();
  }

  getRolesList(): void {
    this.roles$ = this.route.paramMap.pipe(
      switchMap(params => {
        // (+) before `params.get()` turns the string into a number
        this.selectedId = params.get('roleId');
        return this.roleService.getRolesList();
      })
    );

    // this.roleService.getRolesList()
    //     .subscribe(roles => this.roles = roles);
  }


  createRole(roleEnum: number, roleName: string): void {
    roleName = roleName.trim();

    if (!roleName) { return; }
    this.roleService.createRole({id: '', roleEnum: roleEnum, roleName: roleName} as Role);
      // .subscribe(role => {
      //   this.roles$.push(role);
      // });
  }
  
  deleteRole(role: Role): void {
    // this.roles = this.roles.filter(h => h !== role);
    this.roleService.deleteRole(role)
    .subscribe();
  }
}
