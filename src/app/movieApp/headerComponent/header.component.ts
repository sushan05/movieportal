import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'mvi-header',
    templateUrl:'./header.component.html',
    styleUrls:['./header.component.css']
})
export class HeaderComponent{

    constructor(private _auth: AuthService, private _router: Router){
    }

    doLogout(){
        this._auth.logout();
        this._router.navigate(['/']);
        return false;
    }
}