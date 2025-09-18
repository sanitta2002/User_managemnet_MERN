import jwt, { SignOptions } from 'jsonwebtoken'

const accessSecret:string=process.env.ACCESS_SECRET ?? ''
const refreshSecret:string =process.env.REFRESH_SECRET ?? ""
const accessExpiry:string =process.env.ACCESS_EXPIRY ?? "1h"
const refreshExpiry:string =process.env.REFRESH_EXPIRY ?? "7d"

export const generateToken =(userId:any)=>{
  if(!accessSecret && ! refreshSecret){
    throw new Error('JWT secret keys are missing in .env')
  }
  const accessToken=jwt.sign({id:userId},accessSecret,{expiresIn:accessExpiry} as SignOptions)
  const refreshToken=jwt.sign({id:userId},refreshSecret,{expiresIn:refreshExpiry} as SignOptions)

  return {accessToken,refreshToken}
}