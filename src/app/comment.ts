import {IUser} from "./user";
import {ICard} from "./card";

export interface IComment {
  id: number;
  card:ICard,
  user:IUser,
  text:string;
}
