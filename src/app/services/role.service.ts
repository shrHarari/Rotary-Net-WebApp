import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Role } from '../models/role';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
    
    private roleBaseUrl = 'api/role'

    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

  getRolesList(): Observable<Role[]> {

    const roleUrl = `${this.roleBaseUrl}`; // URL to web api: 'http://10.100.102.6:3030/api/role';
    
    return this.http.get<Role[]>(roleUrl)
      .pipe(
        tap(_ => this.log('fetched roles')),
        catchError(this.handleError<Role[]>('Get Roles List', []))
      );
  }
  
  getRoleById(roleId: string): Observable<Role> {

    const roleUrl = `${this.roleBaseUrl}/${roleId}`; // URL to web api: 'http://10.100.102.6:3030/api/role/:roleId';
    return this.http.get<Role>(roleUrl)
    .pipe(
      tap(_ => this.log(`fetched role id=${roleId}`)),
      catchError(this.handleError<Role>(`Get Role ById =${roleId}`))
    );
  }
  
  getRole(roleId: string) {
    return this.getRolesList().pipe(
      map((roles: Role[]) => roles.find(role => role.id === roleId))
    );
  }

  /** PUT: update the Role on the server */
  updateRole(role: Role): Observable<any> {
    const roleUrl = `${this.roleBaseUrl}/${role.id}`; // URL to web api: 'http://10.100.102.6:3030/api/role/:roleId';
    return this.http.put(roleUrl, role, this.httpOptions)
    .pipe(
      tap(_ => this.log(`updated role id=${role.id}`)),
      catchError(this.handleError<any>('update Role'))
    );
  }

  /** POST: add a new Role to the server */
  createRole(role: Role): Observable<Role> {
    const roleUrl = `${this.roleBaseUrl}`; // URL to web api: 'http://10.100.102.6:3030/api/role';
    return this.http.post<Role>(roleUrl, role, this.httpOptions)
    .pipe(
      tap((newRole: Role) => this.log(`Created role w/ id=${newRole.id}`)),
      catchError(this.handleError<Role>('createRole'))
    );
  }

  /** DELETE: delete the Role from the server */
  deleteRole(role: Role | string): Observable<Role> {
    const id = typeof role === 'string' ? role : role.id;
    const roleUrl = `${this.roleBaseUrl}/${id}`; // URL to web api: 'http://10.100.102.6:3030/api/role/:roleId';

    return this.http.delete<Role>(roleUrl, this.httpOptions)
    .pipe(
      tap(_ => this.log(`deleted role id=${id}`)),
      catchError(this.handleError<Role>('deleteRole'))
    );
  }

  /* GET Roles whose name contains search term */
  searchRoles(term: string): Observable<Role[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    const roleSearchUrl = `${this.roleBaseUrl}/query/${term}`; // URL to web api: 'http://10.100.102.6:3030/api/hero/query/:query';
    return this.http.get<Role[]>(roleSearchUrl)
    .pipe(
      tap(x => x.length ?
        this.log(`Found Roles matching "${term}"`) :
        this.log(`No Roles matching "${term}"`)),
      catchError(this.handleError<Role[]>('searchRoles', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
