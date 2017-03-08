import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from './user';

@Injectable()
export class UserService {
  private heroesUrl = 'app/user';  // URL to web api

  constructor(private http: Http) { 
    localStorage.setItem('user',JSON.stringify({role:'ops',permissions:['TRADES','TESTER','OPS']}));
  }

  getUser(): User {
    let json = JSON.parse(localStorage.getItem('user'));
    let user = new User();
    user.permissions = json.permissions;
    user.role = json.role;
    return user;
  }

  getPermissions(): Array<String>{
    let json = JSON.parse(localStorage.getItem('user'));
    return json.permissions;
  }

  hasAccess(...rolesAllowed:Array<String>): boolean{
    let userPermissions = JSON.parse(localStorage.getItem('user')).permissions;
    const intersectedRoles = userPermissions.reduce((acc, curr) => {
        return [
            ...acc,
            ...rolesAllowed.filter(role => role.trim().toUpperCase() === curr.trim().toUpperCase())
        ]
    }, []);
    return intersectedRoles.length > 0;
  }

}

