export interface IUser  {
    id: number,
    name: string,
    email: string,
    password: string,
    age: number,
    is_Active?: boolean,
    created_at?: Date,
    updated_at?: Date
}
export interface ICreateUser{
    name:string
    email:string
    password:string
    age:number
}

export interface IUpdateUser{

name?:string

email?:string

password?:string

age?:number

}