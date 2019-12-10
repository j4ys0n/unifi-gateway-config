import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Response } from '@angular/http';

import { Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

type Methods = {
  readonly post: boolean
}

const METHODS: Methods = {
  post: true
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = ''

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private http: HttpClient
  ) { }

  getData(endpoint: string = ''): Observable<any> {
    return this.http.get<any>(endpoint)
      .pipe(
        catchError((err) => {
          return this.handleError(err, endpoint)
        })
      );
  }

  sendData(endpoint: string = '', payload: any, method: string = 'post'): Observable<any> {
    if (METHODS[method]) {
      let req: any;
      switch (method) {
        case 'post':
          req = this.http.post<any>(this.baseUrl + endpoint, payload, this.httpOptions)
          break;
      }
      return req.pipe( catchError((err) => {
        return this.handleError(err, endpoint)
      }));
    } else {
      return new Observable(observer => {
        observer.next({status: 500, message: 'error', error: 'bad method'})
        observer.complete();
      })
    }

  }

  private handleError(err: any, endpoint: string): Observable<any> {
    if (err.status >= 400 && err.status < 500) {
      if (err.error) {
        console.log(err.error);
      } else {
        console.error(err);
      }
    } else if (err.status === 0) {
      console.log(err.message);
    } else {
      console.error(err);
    }
    return new Observable(observer => {
      observer.next(err);
      observer.complete();
    });
  }
}
