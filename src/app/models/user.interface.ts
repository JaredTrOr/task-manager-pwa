export interface User {
    _id?: string,
    name: string,
    username: string,
    email: string,
    password?: string
    image?: string
}

export interface UserLogin {
    email: string, 
    password: string
}