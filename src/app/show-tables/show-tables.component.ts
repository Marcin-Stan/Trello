import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {IUser} from "../user";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {IBoard} from "../board";
import {IBoardUser} from "../board-user";
import {IUserWithToken} from "../user-with-token";
import { MatMenuTrigger } from '@angular/material/menu';
import  {ChangeNameService} from "../change-name-service.service";
import {IUserWithBoardAndToken} from "../user-with-board-and-token";



@Component({
  selector: 'app-show-tables',
  templateUrl: './show-tables.component.html',
  styleUrls: ['./show-tables.component.css']
})
export class ShowTablesComponent implements OnInit {
  readonly ROOT_URL = 'https://pl-paw-2021.herokuapp.com/boards';
  readonly ADD_BOARD_URL = 'https://pl-paw-2021.herokuapp.com/boards/add';
  readonly ROOT_URL_change_name = 'https://pl-paw-2021.herokuapp.com/boardChangeName';
  postData = {};

  constructor(private http: HttpClient, private dialogService: ChangeNameService, private dialogService2: ChangeNameService) {
  }

  result: string;
  listOfBoards: IBoard[];
  @Input() userWithToken: IUserWithToken;
  @Output() messageEvent = new EventEmitter<IUserWithBoardAndToken>();

  ngOnInit(): void {
    this.getBoards();
  }


  getBoards() {
    const headers = new HttpHeaders()
      .set("authorization", this.userWithToken.token);
    this.http.post<IBoard[]>(this.ROOT_URL, this.userWithToken.user, {headers: headers}).toPromise().then(data => {
      console.log(data);
      this.listOfBoards = data;
    });
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
    event.preventDefault();
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
}






