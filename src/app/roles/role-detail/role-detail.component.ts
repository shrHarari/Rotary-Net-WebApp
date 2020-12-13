import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { RoleService } from '../../services/role.service';
import { Role } from '../../models/role';

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.css']
})
export class RoleDetailComponent implements OnInit {

  role$: Observable<Role> ;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roleService: RoleService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getRoleById();
  }

  getRoleById(): void {
    // let heroId: string  = +this.route.snapshot.paramMap.get('_id'); >>>>>>> the + sign convert to number

    // let roleId: string  = this.route.snapshot.paramMap.get('roleId');
    // this.roleService.getRoleById(roleId)
    //   .subscribe(role => this.role = role);
      
    this.role$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.roleService.getRoleById(params.get('roleId')))
    );
    
    // .subscribe(role => this.role = role);
    
    // const id = this.route.snapshot.paramMap.get('roleId');
    // this.role$ = this.roleService.getRoleById(id);
  }

  goBackToRolesList(role: Role) {
    // this.router.navigate(['/roles']);
    
    const roleId = role ? role.id : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that hero.
    // Include a junk 'foo' property for fun.
    this.router.navigate(['/roles', { roleId: roleId, foo: 'foo' }]);
  
  }

  goBack(): void {
    this.location.back();
  }
  
  save(role: Role): void {
    this.roleService.updateRole(role)
      .subscribe(() => this.goBackToRolesList(role));
  }
  
}
