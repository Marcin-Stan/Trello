import {ILabel} from "./label";

export interface ICard {
  id: number;
  list_id: number;
  title: string;
  description: any;
  order: number;
  archived: boolean;
  label: ILabel
}