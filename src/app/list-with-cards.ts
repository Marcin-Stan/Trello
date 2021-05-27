import {IList} from "./list";
import {ICard} from "./card";

export interface IListWithCards {
  list:IList;
  cards:ICard[];
}
