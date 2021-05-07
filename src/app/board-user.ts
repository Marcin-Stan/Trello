import {IBoard} from "./board";
import {IUser} from "./user";

export interface IBoardUser {
  id:number;
  board:IBoard;
  user:IUser;
}
