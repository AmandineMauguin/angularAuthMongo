import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap, catchError } from 'rxjs/operators';

const TOKEN_KEY = 'access_token'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient, 
    private helper: JwtHelperService,
  ) { 
    this.checkToken();
  }

  url = environment.url;
  user= null;
  authentificationState = new BehaviorSubject(false);


  checkToken() {
    const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        const decoded = this.helper.decodeToken(token);
        const isExpired = this.helper.isTokenExpired(token);
        if (!isExpired) {
          this.user = decoded;
          this.authentificationState.next(true);
        } else {
          localStorage.removeItem(TOKEN_KEY);
        }
      }
    };

    
    login(credentials){
      return this.http.post(this.url+'/auth',credentials).pipe(
        tap(res => {
          localStorage.setItem(TOKEN_KEY,res['token']);
          this.user = this.helper.decodeToken(res['token']);
          this.authentificationState.next(true);
        }),
        catchError(e => {
          console.log('truc');
          alert(e.error.msg);
          throw e;
        })
      )
    };

    logout(){
      localStorage.removeItem(TOKEN_KEY);
      this.authentificationState.next(false);
      
    }

    isAuthenticated(){
      return this.authentificationState.value;
    }


  };






