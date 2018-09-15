import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private _authService: AuthService, private _router: Router){
    }

    canActivate(route, state: RouterStateSnapshot){
        if(this._authService.isLoggedIn()) return true;

        this._router.navigate([''], {queryParams : {returnUrl: state.url}});
        return false;
    }
}

@Injectable()
export class NoAuthGuard implements CanActivate{
    constructor(private _authService: AuthService, private _router: Router){
    }

    canActivate(){
        if(!this._authService.isLoggedIn()) return true;

        this._router.navigate(['movies']);
        return false;
    }
}