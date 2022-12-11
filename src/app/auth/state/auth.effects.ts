import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, exhaustMap, map, mergeMap, tap } from "rxjs/operators";
import { AuthService } from "src/app/services/auth.service";
import { AppState } from "src/app/store/app.state";
import { setErrorMessage, setLoadingSpinner } from "src/app/store/shared/shared.actions";
import { autoLogin, autoLogout, loginStart, loginSuccess, signupStart, signupSuccess } from "./auth.actions";


@Injectable()
export class AuthEffects{
  constructor(private action$:Actions,
     private authService:AuthService,
      private store:Store<AppState>,
      private router:Router
      )
      {

    const login$ = createEffect(()=>{
        return this.action$.pipe(
            ofType(loginStart),
            exhaustMap(action=>{
             return this.authService.login(action.email,action.password).pipe(
                map((data)=>{
                    this.store.dispatch(setLoadingSpinner({status:false}));
                    this.store.dispatch(setErrorMessage({message:''}))
                    const user=this.authService.formatUser(data);
                    this.authService.setUserInLocalStorage(user);
                 return loginSuccess({user});
             }),
             catchError(errorRes=>{
              console.log(errorRes.error.errorMessage);
              const errorMessage=this.authService.getErrorMessage(
                errorRes.error.errorMessage
                );
              return of(setErrorMessage({message:errorMessage}));
             })
             );   
        })
        );
    });
  }
  loginRedirect$ = createEffect(
    () => {
    return this.action$.pipe(
      ofType(...[loginSuccess,signupSuccess]),
       tap((action)=>{
         this.store.dispatch(setErrorMessage({message:''}));
         if(action.redirect){
          this.router.navigate(['/']);
         }
    })
    );
  },
   {dispatch:false}
   );

  signUpRedirect$ = createEffect(
    () => {
    return this.action$.pipe(
      ofType(signupSuccess),
       tap((action)=>{
         this.router.navigate(['/'])
    })
    );
  },
  {dispatch:false}
  );

   signUp$ = createEffect(
    ()=>{
      return this.action$.pipe(
        ofType(signupStart),
        exhaustMap((action)=>{
        return this.authService.signUp(action.email,action.password).pipe(
          map((data)=>{
          this.store.dispatch(setLoadingSpinner({status:false}));
          const user=this.authService.formatUser(data);
          this.authService.setUserInLocalStorage(user);
          return signupSuccess({user,redirect:true});
        }),catchError(errorRes=>{
          console.log(errorRes.error.errorMessage);
          const errorMessage=this.authService.getErrorMessage(
            errorRes.error.errorMessage
            );
          return of(setErrorMessage({message:errorMessage}));
         })
        );   
    })
  );
});
  
 autoLogin$=createEffect(()=>{
  return this.action$.pipe(
    ofType(autoLogin),
    mergeMap((action)=>{
      const user=this.authService.getUserFromLocalStorage();
      return of(loginSuccess({user,redirect:false}));
      console.log(user);
    })
  );
 },{dispatch:false});

 logout$ = createEffect(()=>{
  return this.action$.pipe(ofType(autoLogout),
  map((action)=>{
    this.authService.logout();
    this.router.navigate(['auth']);
  })
  );
 },{dispatch:false});
   );
});
}