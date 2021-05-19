import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExploreBoardComponent} from './explore-board.component';

describe('ExploreBoardComponent', () => {
  let component: ExploreBoardComponent;
  let fixture: ComponentFixture<ExploreBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExploreBoardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
