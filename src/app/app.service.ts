import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {
  authenticated = false;

  constructor(private http: HttpClient) {
  }

  authenticate(credentials, callback) {

    const headers = new HttpHeaders(credentials ? {
      authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    } : {});

    this.http.get('http://localhost:8080/user', {headers: headers})
      .subscribe(response => {
        if (response['name']) {
          this.authenticated = true;
          localStorage.setItem('currentUser', JSON.stringify({user: credentials.user, token: headers.get('authorization') }));
        } else {
          this.authenticated = false;
        }
        return callback && callback();
      });

  }

}

