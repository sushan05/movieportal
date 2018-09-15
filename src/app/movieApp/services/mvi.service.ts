import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { of } from "rxjs";

const baseApi = environment.apiBase;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class MovieService {
  constructor(private _http: HttpClient) {
  }

  getMovies(yearFilter?, langFilter?){
    let accessToken = localStorage.getItem('accessToken');
    let url = baseApi + 'movies';

    url += yearFilter || langFilter ? "?" : '';

    url += yearFilter ? "year=" + yearFilter : '';

    url += yearFilter && langFilter ? "&" : '';

    url += langFilter ? "language=" + langFilter : '';

    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  'Bearer ' + accessToken
      })
    };

    return this._http.get(url, httpOptions);
  }

  getMovie(mviId){
    let accessToken = localStorage.getItem('accessToken');
    let url = baseApi + 'movies/' + mviId;

    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  'Bearer ' + accessToken
      })
    };

    return this._http.get(url, httpOptions)
                      .pipe(catchError(error => of(error)));
  }
}

