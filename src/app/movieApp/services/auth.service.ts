import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { of } from "rxjs";
import { JwtHelperService } from '@auth0/angular-jwt';

const baseApi = environment.apiBase;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class AuthService {

  jwtHelper;

  constructor(private _http: HttpClient) {
    this.jwtHelper = new JwtHelperService();
  }

  login(credentials) { 
   return this._http.post(
                            baseApi + 'users/login', 
                            JSON.stringify(credentials),
                            httpOptions
                          )
                    .pipe(map((res) => {
                            if(res && res['accessToken'])
                            {
                              localStorage.setItem('accessToken', res['accessToken']);
                              return true;
                            }

                            return res;
                        }),
                      catchError(error => 
                            of(error.error)
                        ));
  }

  logout() { 
    localStorage.removeItem('accessToken');
  }

  isLoggedIn() {
    let token = localStorage.getItem('accessToken');

    if(!token)
      return false;

    let tokenInfo = this.jwtHelper.decodeToken(token);
    let expirationDate = this.jwtHelper.getTokenExpirationDate(token);
    let isExpired = this.jwtHelper.isTokenExpired(token);

    return !isExpired;
  }

  register(userInfo){
    return this._http.post(
                          baseApi + 'users/signup', 
                          JSON.stringify(userInfo),
                          httpOptions
                        )
                    .pipe(map((res) => {

                          console.log("this is sign up res ", res);

                          if(res && res['_id'])
                          {
                            return true;
                          }

                          return false;
                      }),
                    catchError(error => 
                          of(error)
                      ));
  }
}

