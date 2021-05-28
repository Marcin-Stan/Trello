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
  readonly CHANGE_LIST_NAME='https://pl-paw-2021.herokuapp.com/list/changeName';
  readonly ADD_CARD='https://pl-paw-2021.herokuapp.com/cards/add';
  readonly CHANGE_CARD_TITLE='https://pl-paw-2021.herokuapp.com/card/changeTitle';
  readonly CHANGE_CARD_DESCRIPTION='https://pl-paw-2021.herokuapp.com/card/changeDescription';
  readonly SET_LIST_ARCHIVED = 'https://pl-paw-2021.herokuapp.com/list/archived';
  readonly CHANGE_LIST_OF_CARD='https://pl-paw-2021.herokuapp.com/card/changeList';
  readonly SET_CARD_ARCHIVED = 'https://pl-paw-2021.herokuapp.com/card/archived';
  readonly SET_CARD_LABEL = 'https://pl-paw-2021.herokuapp.com/card/changeLabel';

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
  innekarty: any;


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
    this.http.post(this.ADD_CARD,list.id,requestOptions).subscribe(res=>{
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
    this.http.post(this.CHANGE_LIST_NAME,list.id,requestOptions).subscribe(res=>{
        this.getLists();
      }
    );
  }

  changeCardTitle(card:ICard, title:string){
  let params = new HttpParams();
      params = params.set('title', title);
      const headers = new HttpHeaders()
        .set("authorization", this.userWithBoardAndToken.userWithToken.token);
      const requestOptions = {
        headers: headers,
        params: params
      };
      this.http.post(this.CHANGE_CARD_TITLE,card.id,requestOptions).subscribe(res=>{
          this.getLists();
        }
      );
  }

  changeCardDescription(card:ICard, description:string){
    let params = new HttpParams();
        params = params.set('description', description);
        const headers = new HttpHeaders()
          .set("authorization", this.userWithBoardAndToken.userWithToken.token);
        const requestOptions = {
          headers: headers,
          params: params
        };
        this.http.post(this.CHANGE_CARD_DESCRIPTION,card.id,requestOptions).subscribe(res=>{
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
    this.setListAsArchived(list);
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
        this.changeCardTitle(card,confirmed);
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
        this.changeCardDescription(card,confirmed);
      }
    });
  }

  archiveCardButton(card: ICard) {
    this.setCardAsArchived(card);
  }


  addLabel1(card: ICard) {
    console.log("AAAAAAAAAAAAAA");
  }

  setListAsArchived(list:IList){
    const headers = new HttpHeaders()
    .set("authorization", this.userWithBoardAndToken.userWithToken.token);
       this.http.post(this.SET_LIST_ARCHIVED,list.id,{headers:headers}).subscribe(res=>{
       this.getLists();
       });
  }

  setCardAsArchived(card:ICard){
      const headers = new HttpHeaders()
      .set("authorization", this.userWithBoardAndToken.userWithToken.token);
         this.http.post(this.SET_CARD_ARCHIVED,card.id,{headers:headers}).subscribe(res=>{
         this.getLists();
         });
    }

  moveCardToList(idCard: number, idList: number) {
    console.log(idCard, idList);
    this.changeListOfCard(idCard,idList);
  }

  changeListOfCard(idCard:number, idList:number){
    const headers = new HttpHeaders()
    .set("authorization", this.userWithBoardAndToken.userWithToken.token);
    let params = new HttpParams();
        params = params.set('cardId', idCard.toString());
    const requestOptions = {
          headers: headers,
          params: params
        };

    this.http.post(this.CHANGE_LIST_OF_CARD,idList,requestOptions).subscribe(res=>{
    this.getLists();
    });
  }
  changeCardLabel(card:ICard, label:string){
  const headers = new HttpHeaders()
      .set("authorization", this.userWithBoardAndToken.userWithToken.token);
  let params = new HttpParams();
          params = params.set('label', label);
     const requestOptions = {
            headers: headers,
            params: params
          };
  this.http.post(this.SET_CARD_LABEL,card.id,requestOptions).subscribe(res=>{
  this.getLists();
  })
  }
}
