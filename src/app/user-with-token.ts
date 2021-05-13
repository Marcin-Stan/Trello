import {IUser} from "./user";
import {HttpHeaders} from "@angular/common/http";

export interface IUserWithToken {
  user:IUser;
  token:string;
}
