import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IUserWithBoardAndToken} from "../user-with-board-and-token";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {IList} from "../list";
import {ChangeNameService} from "../change-name-service.service";
import {IListWithCards} from "../list-with-cards";
import {ICard} from "../card";
import {IBoard} from "../board";
import {MatMenuTrigger} from "@angular/material/menu";
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-explore-board',
  templateUrl: './explore-board.component.html',
  styleUrls: ['./explore-board.component.css']
})
export class ExploreBoardComponent implements OnInit {
  @Input() userWithBoardAndToken: IUserWithBoardAndToken;
  readonly ROOT_URL = 'https://pl-paw-2021.herokuapp.com/list/getAll';
  readonly ROOT_ADD_URL = 'https://pl-paw-2021.herokuapp.com/list/add';
  readonly GET_CARDS_FOR_LIST='https://pl-paw-2021.herokuapp.com/card/getAllCardsByList';
  readonly CHANGE_CARD_NAME='https://pl-paw-2021.herokuapp.com/cards/add';
  lists: IList[];
  listsWithCards:IListWithCards[]=[];
  tempListWithCards:IListWithCards={list:null,cards:null};
  contextMenuPosition = {x: '0px', y: '0px'};
  private userIsOwner: boolean;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  menu: any;
  menuCard: any;
  etykiety: any;


  constructor(private http: HttpClient,
              private dialogService: ChangeNameService) {
  }

  ngOnInit(): void {
    this.getLists();
  }

  getLists() {
    this.listsWithCards=[];
    const headers = new HttpHeaders()
      .set("authorization", this.userWithBoardAndToken.userWithToken.token);
    this.http.post<IList[]>(this.ROOT_URL, this.userWithBoardAndToken.board, {headers: headers}).subscribe(data => {
      this.lists = data;
      this.getCardsForLists();
    });
  }

  getCardsForLists() {
    for(let value of this.lists){
      this.getCardsForList(value);
    }
  }

  getCardsForList(list:IList){
    const headers = new HttpHeaders()
      .set("authorization", this.userWithBoardAndToken.userWithToken.token);
    this.http.post<ICard[]>(this.GET_CARDS_FOR_LIST,list,{headers:headers}).subscribe(res=>{
      let tmp;
      tmp={
        list:list,
        cards:res,
      }
      console.log(tmp);
      this.listsWithCards.push(tmp);
    })
  }



  addList(listName: string) {
    let params = new HttpParams();
    params = params.set('name', listName);
    const headers = new HttpHeaders()
      .set("authorization", this.userWithBoardAndToken.userWithToken.token);
    const requestOptions = {
      headers: headers,
      params: params
    };
    this.http.post(this.ROOT_ADD_URL, this.userWithBoardAndToken.board, requestOptions).subscribe(data => {
      this.getLists();
    })
  }

  buttonAddList() {
    const options = {
      title: 'Tworzenie nowej listy',
      message: 'Podaj nazwę listy: ',
      cancelText: 'Anuluj',
      confirmText: 'Potwierdź'
    };

    this.dialogService.open(options);
    this.dialogService.confirmed().subscribe(confirmed => {
      if (!confirmed.isEmpty) {
        console.log(confirmed);
        this.addList(confirmed);
      }
    });
  }

  addCardToList(list:IList,name:string){
    let params = new HttpParams();
    params = params.set('title', name);
    const headers = new HttpHeaders()
      .set("authorization", this.userWithBoardAndToken.userWithToken.token);
    const requestOptions = {
      headers: headers,
      params: params
    };
    this.http.post(this.CHANGE_CARD_NAME,list.id,requestOptions).subscribe(res=>{
      this.getLists();
      }
    );
  }

  changeListName(list:IList,name:string){
    let params = new HttpParams();
    params = params.set('name', name);
    const headers = new HttpHeaders()
      .set("authorization", this.userWithBoardAndToken.userWithToken.token);
    const requestOptions = {
      headers: headers,
      params: params
    };
    this.http.post(this.CHANGE_CARD_NAME,list.id,requestOptions).subscribe(res=>{
        this.getLists();
      }
    );
  }

  changeListNameButton(list: IList) {
    const options = {
      title: 'Zmiana nazwy listy',
      message: 'Podaj nową nazwę listy: ',
      cancelText: 'Anuluj',
      confirmText: 'Potwierdź'
    };
    this.dialogService.open(options);
    this.dialogService.confirmed().subscribe(confirmed => {
      if (!confirmed.isEmpty) {
        console.log(confirmed);
        this.changeListName(list, confirmed);
      }
    });
  }

  archiveListButton(list: IList) {
    //wywołanie metodu archiwizuj liste
  }

  addCardButton(list: IList) {
    const options = {
      title: 'Dodawanie karty',
      message: 'Podaj nazwę karty: ',
      cancelText: 'Anuluj',
      confirmText: 'Potwierdź'
    };
    this.dialogService.open(options);
    this.dialogService.confirmed().subscribe(confirmed => {
      if (!confirmed.isEmpty) {
        console.log(confirmed);
        this.addCardToList(list, confirmed);
      }
    });
  }

  changeCardNameButton(card: ICard) {
    const options = {
      title: 'Zmiana nazwy karty',
      message: 'Podaj nową nazwę karty: ',
      cancelText: 'Anuluj',
      confirmText: 'Potwierdź'
    };
    this.dialogService.open(options);
    this.dialogService.confirmed().subscribe(confirmed => {
      if (!confirmed.isEmpty) {
        console.log(confirmed);
        //TUTAJ DODAĆ WYWOŁANIE METODY ZMIEŃ NAZWE KARTY
      }
    });
  }

  changeCardDescriptionButton(card: ICard) {
    const options = {
      title: 'Zmiana opisu karty',
      message: 'Podaj opis karty: ',
      cancelText: 'Anuluj',
      confirmText: 'Potwierdź'
    };
    this.dialogService.open(options);
    this.dialogService.confirmed().subscribe(confirmed => {
      if (!confirmed.isEmpty) {
        console.log(confirmed);
        //TUTAJ DODAĆ WYWOŁANIE METODY ZMIEŃ OPIS KARTY
      }
    });
  }

  archiveCardButton(card: ICard) {
    //wywołanie metodu archiwizuj karte
  }


  addLabel1(card: ICard) {
    console.log("AAAAAAAAAAAAAA");
  }
}
