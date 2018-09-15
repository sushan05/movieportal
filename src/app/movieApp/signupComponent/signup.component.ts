import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Title } from '@angular/platform-browser';

@Component({
    templateUrl:'./signup.component.html'
})
export class SignUpComponent{

    errorMsg;
    snackBarState;

    register = new FormGroup({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        userName: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
    });

    constructor(
                private _auth: AuthService,
                private _actRoute: ActivatedRoute,
                private _router: Router,
                public _snackBar: MatSnackBar,
                private _titleService: Title
            )
    {
        this._titleService.setTitle("Sign Up");
        this.register.controls.userName.valueChanges.subscribe(data => {
            this.errorMsg = '';
        });
    }

    onSubmit(registerForm){
        if(registerForm.invalid){
            return false;
        }

        this._auth.register(registerForm.value)
                    .subscribe(data => {
                        if(data === true)
                        {
                            this.errorMsg = '';
                            this.openSnackBar("User registered succesfully!! You can now log in.");
                        }
                        else
                        {
                            if(data['status'] === 500){
                                registerForm.controls.userName.setErrors({"notunique": true});
                                this.errorMsg = "UserName already in use. Please try another name";
                            }
                            else{
                                this.errorMsg = "Something went wrong";
                            }
                        }
                    })
    }

    openSnackBar(message: string, action?: string) {
        delete this.snackBarState;

        this.snackBarState = this._snackBar.open(message, action, {
          duration: 3000,
        });

        this.snackBarState.afterDismissed().subscribe(info => {
            this._router.navigate(['sign-in']);
        })
    }
}