import { Injectable } from "@angular/core";
import { HttpClient } from  '@angular/common/http'
import { environment } from "./../../environments/environment";
import { Observable } from "rxjs";
import { AuthResponseData } from "../models/AuthResponseData.model";
import { User } from "../models/User.model";
import { AppState } from "../store/app.state";
import { Store } from "@ngrx/store";
import { autoLogout } from "../auth/state/auth.actions";

@Injectable({
    providedIn:'root',
})

export class AuthService{
  timeoutInterval:any;
  constructor(private http: HttpClient, private store:Store<AppState>){

  }

  login(email:string, password:string):Observable<AuthResponseData>{
    debugger;
    return this.http.post<AuthResponseData>(
        '',
        {    email, password,
             returnSecureToken : true
        }
    );
  }

  signUp(email:string, password:string):Observable<AuthResponseData>{
    return this.http.post<AuthResponseData>(
      '',
      {    email, password,
           returnSecureToken : true
      }
    );
  }

  formatUser(data:AuthResponseData){
    const expirationDate= new Date(new Date().getTime()+ +data.expiresIn*1000)
    const user = new User(data.email, data.idToken, data.localId, expirationDate);
    return user;
  }

  getErrorMessage(message:string){
    switch(message){
      case 'EMAIL_NOT_FOUND':
        return 'Email Not Found';
      case 'INVALID_PASSWORD':
        return 'Invalid Password';
      case 'EMAIL_EXISTS':
        return 'Email Already Exits';
      default:
        return 'Unknown Error occurred. Please try again';
    }
  }

  setUserInLocalStorage(user:User){
    localStorage.setItem('userData', JSON.stringify(user));
    this.runTimeoutInterval(user);
  }

  runTimeoutInterval(user:User){
     const todaysDate= new Date().getTime();
     const expirationDate=user.expireDate.getTime();
     const timeInterval=expirationDate-todaysDate;

     this.timeoutInterval=setTimeout(() => {
      this.store.dispatch(autoLogout());
       //Logout Functionality or get the refresh token
     }, timeInterval);
  }

  getUserFromLocalStorage(){
    const userDataString=localStorage.getItem('userData');
    if(userDataString){
      const userData=JSON.parse(userDataString);
      const expirationDate= new Date(userData.expirationDate);
      const user=new User(userData.email,
         userData.token,
         userData.localId,
         userData.expirationDate
         );
         this.runTimeoutInterval(user);
         return user;
    }
    return null;
  }

  logout(){
    localStorage.removeItem('userData');
    if(this.timeoutInterval){
      clearTimeout(this.timeoutInterval);
      this.timeoutInterval=null;
    }
  }
}