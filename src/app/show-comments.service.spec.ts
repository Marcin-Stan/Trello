import { TestBed } from '@angular/core/testing';

import { ShowCommentsService } from './show-comments.service';

describe('ShowCommentsService', () => {
  let service: ShowCommentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowCommentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
