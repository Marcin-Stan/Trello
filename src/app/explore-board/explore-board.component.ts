import {Component, Input, OnInit} from '@angular/core';
import {IBoard} from "../board";

@Component({
  selector: 'app-explore-board',
  templateUrl: './explore-board.component.html',
  styleUrls: ['./explore-board.component.css']
})
export class ExploreBoardComponent implements OnInit {
  @Input() board:IBoard;

  constructor() { }
  ngOnInit(): void {

  }

}
