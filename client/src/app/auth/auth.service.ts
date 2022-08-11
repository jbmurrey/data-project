import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs'
import {tap} from 'rxjs/operators'


interface usernameAvailable{
  available:boolean;
}
interface Credentials{
  username:string;
  password:string;
  passwordConfirmation:string;
}
interface SignUpResponse{
  username:string;
}
interface SignedInResponse{
  authenticated:boolean;
  username:string;
}
interface SigninCredentials{
  username:string;
  password:string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl:string = 'https://api.angular-email.com/auth';
  signedin$ = new BehaviorSubject(null);
  constructor(private http:HttpClient) { }
  usernameAvailable(username:string){
    return this.http.post<usernameAvailable>(`${this.baseUrl}/username`,{username},{withCredentials:true});
  }
  signUp(credentials:Credentials){
    return this.http.post<SignUpResponse>(`${this.baseUrl}/signup`,credentials,{withCredentials:true}).pipe(
      tap(()=>
      {
        this.signedin$.next(true)
      }))
  }
  checkAuth(){
    return this.http.get<SignedInResponse>(`${this.baseUrl}/signedin`,{withCredentials:true}).pipe(
      tap(({authenticated})=>{
        this.signedin$.next(authenticated);
      })
    )
  }
  signout(){
    return this.http.post(`${this.baseUrl}/signout`,{},{withCredentials:true})
    .pipe(
      tap(()=>{
        this.signedin$.next(false);
      })
    )
  }
  signin(credentials: SigninCredentials){
    return this.http.post(`${this.baseUrl}/signin`,credentials,{withCredentials:true})
    .pipe(
    tap(()=>{
      this.signedin$.next(true);
    }))
  }
}
