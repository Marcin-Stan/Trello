import {Component} from '@angular/core';
import {IUserWithToken} from "./user-with-token";
import {IUserWithBoardAndToken} from "./user-with-board-and-token";


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

  constructor() {
    this.LogedIn = false;
  }

  receiveMessage($event) {
    this.userWithToken = $event;
    this.LogedIn = true;
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
