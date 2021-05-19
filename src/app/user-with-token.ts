import {IUser} from "./user";

export interface IUserWithToken {
  user: IUser;
  token: string;
}
