import {Component, Input, OnInit} from '@angular/core';
import {IUserWithBoardAndToken} from "../user-with-board-and-token";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {IList} from "../list";
import {ChangeNameService} from "../change-name-service.service";
import {IListWithCards} from "../list-with-cards";
import {ICard} from "../card";

@Component({
  selector: 'app-explore-board',
  templateUrl: './explore-board.component.html',
  styleUrls: ['./explore-board.component.css']
})
export class ExploreBoardComponent implements OnInit {
  @Input() userWithBoardAndToken: IUserWithBoardAndToken;
  readonly ROOT_URL = 'https://pl-paw-2021.herokuapp.com/list/getAll';
  readonly ROOT_ADD_URL = 'https://pl-paw-2021.herokuapp.com/list/add';
  readonly GET_CARDS_FOR_LIST='';
  lists: IList[];
  listsWithCards:IListWithCards[];
  tempListWithCards:IListWithCards;
  cardTemp = [{
    id: 1,
    list_id: 1,
    title: "Witam",
    description: "Zegnam",
    order: 1,
    archived: true
  },
    {
      id: 1,
      list_id: 1,
      title: "chichua",
      description: "AUUUUUUUU",
      order: 1,
      archived: true
    }]


  constructor(private http: HttpClient, private dialogService: ChangeNameService) {
  }

  ngOnInit(): void {
    this.getLists();
  }

  getLists() {
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
      this.tempListWithCards.list=list;
      this.tempListWithCards.cards=res;
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
}
