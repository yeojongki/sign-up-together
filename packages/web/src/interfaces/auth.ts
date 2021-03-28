import { User } from './user'

export type LoginInfo = Required<Pick<User, 'password' | 'username'>>
