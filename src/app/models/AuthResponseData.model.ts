export interface AuthResponseData{
    localId: any;
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    registered?:boolean;
}