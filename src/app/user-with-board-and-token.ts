import {IUser} from "./user";
import {IBoard} from "./board";
import {IUserWithToken} from "./user-with-token";

export interface IUserWithBoardAndToken {
  userWithToken:IUserWithToken;
  board:IBoard;

}
