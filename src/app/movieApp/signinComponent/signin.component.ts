import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
    templateUrl:'./signin.component.html'
})
export class SignInComponent{

    errorMsg;

    constructor(
                private _auth: AuthService,
                private _actRoute: ActivatedRoute,
                private _router: Router,
                private _titleService: Title
            ){
        this._titleService.setTitle("Sign In");
    }

    login = new FormGroup({
                username: new FormControl(null, [Validators.required]),
                password: new FormControl(null, [Validators.required]),
            });

    onSubmit(loginForm){
        console.log(loginForm.value);
        this._auth.login(loginForm.value)
                    .subscribe(data => {
                        if(data === true)
                        {
                            let returnUrl = this._actRoute.snapshot.queryParamMap.get('returnUrl');
                            this.errorMsg = '';
                            this._router.navigate([returnUrl || 'movies']);
                        }
                        else
                        {
                            this.errorMsg = data['message'];
                        }
                    })
    }
}