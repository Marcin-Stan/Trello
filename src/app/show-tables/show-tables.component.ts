import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IUser} from "../user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IBoard} from "../board";
import {IBoardUser} from "../board-user";
import {IUserWithToken} from "../user-with-token";
import { MatMenuTrigger } from '@angular/material/menu';



@Component({
  selector: 'app-show-tables',
  templateUrl: './show-tables.component.html',
  styleUrls: ['./show-tables.component.css']
})
export class ShowTablesComponent implements OnInit {
  readonly ROOT_URL = 'https://pl-paw-2021.herokuapp.com/boards';
  readonly ADD_BOARD_URL = 'https://pl-paw-2021.herokuapp.com/boards/add';
  postData={};
  constructor(private http:HttpClient){
  }
  result:string;
  listOfBoards:IBoard[];
  @Input() userWithToken :IUserWithToken;

  ngOnInit(): void {
    this.getBoards();
  }


  getBoards(){
    const headers = new HttpHeaders()
      .set("authorization",this.userWithToken.token);
    this.http.post<IBoard[]>(this.ROOT_URL,this.userWithToken.user,{headers:headers}).toPromise().then(data => {console.log(data);this.listOfBoards=data;});
  }

  addBoard(boardName:string){
const headers = new HttpHeaders()
      .set("authorization",this.userWithToken.token);
    this.postData={
      name:boardName,
      owner:{
        id:this.userWithToken.user.id,
      }};

    this.http.post(this.ADD_BOARD_URL,this.postData,{headers:headers}).subscribe(
        res => {
        this.getBoards();
        });

    }

  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;

  contextMenuPosition = { x: '0px', y: '0px' };

  onContextMenu(event: MouseEvent, item: IBoard) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { 'item': item };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

  onContextMenuAction1(item: IBoard) {
    console.log(item.id);
  }

  onContextMenuAction2(item: IBoard) {
    alert(`Click on Action 2 for ${item.id}`);
  }
}






