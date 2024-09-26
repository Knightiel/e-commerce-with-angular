import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // constructor(private http: HttpClient) { } //ANTIGA

  private _http = inject(HttpClient) //NOVA

  con = 'https://dummyjson.com/auth/login'

  logar(username : string, password: string){
    return this._http.post(this.con, {
      username: username,
      password: password,
    }).pipe(map((res: any) => {
      return {
        email: res.email,
        firstName: res.firstName,
        lastName: res.lastName,
        image: res.image,
      };
    }));
  }
}
