import {IUser} from "./user";

export interface IBoard {
  id: number;
  name: string;
  background: any;
  owner: IUser;
}
