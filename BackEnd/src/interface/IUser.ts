export interface Iuser{
    _id?:string,
    name:string,
    email:string,
    password:string,
    imageUrl?:string,
    isAdmin?:boolean
}


export interface LoginResponse {
    user: Iuser;
    accessToken: string;
    refreshToken: string;
}