import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

const TOKEN_KEY = 'access_token'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient, 
    private helper: JwtHelperService,
  ) { 
    
  }

  url = environment.url;
  user= null;

  checkToken(){
    this.http.get('http://localhost:443/').subscribe()
  }




}
