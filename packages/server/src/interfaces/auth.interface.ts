import { User } from "@/modules/user/user.entity";

export type LoginInfo = Required<Pick<User, 'password' | 'username'>>
