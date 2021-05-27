import {Component, Input, OnInit} from '@angular/core';
import {IUserWithBoardAndToken} from "../user-with-board-and-token";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {IList} from "../list";
import {ChangeNameService} from "../change-name-service.service";

@Component({
  selector: 'app-explore-board',
  templateUrl: './explore-board.component.html',
  styleUrls: ['./explore-board.component.css']
})
export class ExploreBoardComponent implements OnInit {
  @Input() userWithBoardAndToken: IUserWithBoardAndToken;
  readonly ROOT_URL = 'https://pl-paw-2021.herokuapp.com/list/getAll';
  readonly ROOT_ADD_URL = 'https://pl-paw-2021.herokuapp.com/list/add';
  lists: IList[];
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
    });
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
      this.lists[0].cards[0] = this.cardTemp[0];
      this.lists[0].cards[1] = this.cardTemp[1];
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
