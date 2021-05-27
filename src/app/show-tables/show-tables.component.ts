import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {IBoard} from "../board";
import {IUserWithToken} from "../user-with-token";
import {MatMenuTrigger} from '@angular/material/menu';
import {ChangeNameService} from "../change-name-service.service";
import {IUserWithBoardAndToken} from "../user-with-board-and-token";
import {IBoardUser} from "../board-user";
import {Observable} from "rxjs";
import {FormControl} from "@angular/forms";
import {map, startWith} from "rxjs/operators";


@Component({
  selector: 'app-show-tables',
  templateUrl: './show-tables.component.html',
  styleUrls: ['./show-tables.component.css']
})
export class ShowTablesComponent implements OnInit {
  readonly ROOT_URL = 'https://pl-paw-2021.herokuapp.com/boardsUser/getByUser';
  readonly ADD_BOARD_URL = 'https://pl-paw-2021.herokuapp.com/boards/add';
  readonly GET_NICKNAMES_URL = 'https://pl-paw-2021.herokuapp.com/users';
  readonly ROOT_URL_change_name = 'https://pl-paw-2021.herokuapp.com/boardChangeName';
  readonly CHECK_IS_OWNER='https://pl-paw-2021.herokuapp.com/boards/checkOwner';
  postData = {};


  constructor(private http: HttpClient, private dialogService: ChangeNameService, private dialogService2: ChangeNameService) {
  }
  userIsOwner:boolean;
  listOfBoards:IBoardUser[];
  @Input() userWithToken :IUserWithToken;

  @Output() messageEvent = new EventEmitter<IUserWithBoardAndToken>();

  ngOnInit(): void {
    this.getBoards();
  }


  getBoards() {
    const headers = new HttpHeaders()
      .set("authorization",this.userWithToken.token);
    this.http.post<IBoardUser[]>(this.ROOT_URL,this.userWithToken.user,{headers:headers}).toPromise().then(data => {console.log(data);this.listOfBoards=data;});

  }



  addBoard(boardName: string) {
    const headers = new HttpHeaders()
      .set("authorization", this.userWithToken.token);
    this.postData = {
      name: boardName,
      owner: {
        id: this.userWithToken.user.id,
      }
    };

    this.http.post(this.ADD_BOARD_URL, this.postData, {headers: headers}).subscribe(
      res => {
        this.getBoards();
      });
  }

  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;

  contextMenuPosition = {x: '0px', y: '0px'};

  onContextMenu(event: MouseEvent, item: IBoard) {
    this.userIsOwner=false;
    event.preventDefault();
    this.checkIsOwner(item);
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = {'item': item};
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

  onContextMenuAction1(item: IBoard) {
    console.log(item.id);
    let userWitchBoardAndToken: IUserWithBoardAndToken = {userWithToken: this.userWithToken, board: item};
    this.messageEvent.emit(userWitchBoardAndToken);
  }

  onContextMenuAction2(item: IBoard) {
      this.nameChange(item);
  }

  nameChange(item: IBoard) {
    const options = {
      title: 'Zmiana nazwy tablicy',
      message: 'Podaj nową nazwę: ',
      cancelText: 'Anuluj',
      confirmText: 'Potwierdź'
    };

    this.dialogService.open(options);

    this.dialogService.confirmed().subscribe(confirmed => {
      if (!confirmed.isEmpty) {
        console.log(confirmed);
        this.postData = {
          name: confirmed,
          id: item.id
        };
        let params = new HttpParams();
        params = params.set("name", confirmed);
        const headers = new HttpHeaders()
          .set("authorization", this.userWithToken.token);
        const requestOptions = {
          headers: headers,
          params: params
        };
        this.http.post(this.ROOT_URL_change_name, item.id, requestOptions).subscribe(data => {
            this.getBoards();
          }
        );
        console.log(params);

      }
    });
  }

  buttonAddBoard() {
    const options = {
      title: 'Tworzenie nowej tablicy',
      message: 'Podaj nazwę tablicy: ',
      cancelText: 'Anuluj',
      confirmText: 'Potwierdź'
    };

    this.dialogService2.open(options);
    this.dialogService.confirmed().subscribe(confirmed => {
      if (!confirmed.isEmpty) {
        console.log(confirmed);
        this.addBoard(confirmed);
      }
    });
  }

  checkIsOwner(board:IBoard){
    const headers = new HttpHeaders()
      .set("authorization", this.userWithToken.token);
    let postData={
      id:board.id,
      owner:{
        id:this.userWithToken.user.id
      }
    }
    this.http.post<boolean>(this.CHECK_IS_OWNER,postData,{headers:headers}).subscribe(res=>{
      if(res){
        this.userIsOwner=true;
      }else{
        this.userIsOwner=false;
      }
    })
  }
}





