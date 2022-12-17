import { AuthReducer } from "../auth/state/auth.reducer";
import { AUTH_STATE_NAME } from "../auth/state/auth.selector";
import { AuthState } from "../auth/state/auth.state";
import { counterReducer } from "../counter/state/counter.reducer";
import { CounterState } from "../counter/state/counter.state";
import { postsReducers } from "../posts/state/posts.reducers";
import { PostsState } from "../posts/state/posts.states";
import { SharedReducer } from "./shared/shared.reducer";
import { SHARED_STATE_NAME } from "./shared/shared.selector";
import { SharedState } from "./shared/shared.state";
import {routerReducer, RouterReducerState} from '@ngrx/router-store';


export interface AppState{
    counter:CounterState;
    posts:PostsState;
    [SHARED_STATE_NAME]:SharedState;
    [AUTH_STATE_NAME]:AuthState;
    router:RouterReducerState;
}

export const appReducer = {
    counter:counterReducer,
    posts:postsReducers,
    [SHARED_STATE_NAME]:SharedReducer,
    [AUTH_STATE_NAME]:AuthReducer,
    router:routerReducer,
}