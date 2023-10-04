import { User } from "@/lib/types"

export type LoginForm = {
    USN: string,
    password: string
}

export type UserCreate = {
    password: string
    
} & User

export type ServerResponse = {
    state: boolean,
    message: string,
    data?: any
}