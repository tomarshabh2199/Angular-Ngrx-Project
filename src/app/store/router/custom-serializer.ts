
import { RouterStateSnapshot } from '@angular/router';
import {Params} from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';

export interface RouterStateUrl{
    url:string;
    params:Params;
    queryParams:Params;
}

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl>{
  serialize(routerState:RouterStateSnapshot):RouterStateUrl{
    //throw new Error('Method not Implemented.');

    let route=routerState.root;

    while(route.firstChild){
        route=route.firstChild;
    }

    const{
        url,
        root:{queryParams},

    }=routerState;
    const{params}=route;
    return {url, params,queryParams};
  }

}