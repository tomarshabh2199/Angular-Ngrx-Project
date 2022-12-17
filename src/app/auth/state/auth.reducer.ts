import { loginSuccess, signupSuccess, autoLogout } from './auth.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { AuthState, initialState } from './auth.state';

const _authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, action) => {
    console.log(state);
    return {
      ...state,
      user: action.user,
    };
  }),

  on(signupSuccess, (state, action) => {
    console.log(action);
    return {
      ...state,
      user: action.user,
    };
  }),

  on(autoLogout, (state) => {
    return {
      ...state,
      user: null,
    };
  })
);

export function AuthReducer(state: AuthState | undefined, action: Action) {
  console.log(action)
  return _authReducer(state, action);
}