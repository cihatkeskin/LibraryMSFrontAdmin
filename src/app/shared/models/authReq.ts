export interface emailAuthReq{
    email:string,
    password:string,
    authenticatorCode?:string
  }
export interface emailAuthRes{
  accessToken:tokenInfo,
  requiredAuthenticatorType:number
}

export interface tokenInfo {
  token:string,
  expirationDate:string
}

  
  