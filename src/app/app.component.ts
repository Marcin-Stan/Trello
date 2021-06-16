import {Component} from '@angular/core';
import {IUserWithToken} from "./user-with-token";
import {IUserWithBoardAndToken} from "./user-with-board-and-token";
import {Subject} from "rxjs";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userWithToken: IUserWithToken;
  title = 'Trello';
  userWithBoardAndToken: IUserWithBoardAndToken;
  isBoardSelected: boolean;
  LogedIn: boolean;
  eventsSubject: Subject<void> = new Subject<void>();

  constructor() {
    this.LogedIn = false;
  }


  emitEventToChild() {
    this.eventsSubject.next();
  }

  receiveMessage($event) {
    this.userWithToken = $event;
    this.LogedIn = true;
  }
  reloadExploreBoard($event){
    this.emitEventToChild();
  }

  boardIsSelected($event) {
    this.userWithBoardAndToken = $event;
    this.isBoardSelected = true;
  }

  goToDashboard() {
    this.userWithBoardAndToken = null;
    this.isBoardSelected = false;
  }
}
