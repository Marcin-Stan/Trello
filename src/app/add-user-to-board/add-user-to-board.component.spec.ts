import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserToBoardComponent } from './add-user-to-board.component';

describe('AddUserToBoardComponent', () => {
  let component: AddUserToBoardComponent;
  let fixture: ComponentFixture<AddUserToBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserToBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserToBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
