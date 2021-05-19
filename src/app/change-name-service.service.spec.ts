import {TestBed} from '@angular/core/testing';

import {ChangeNameService} from './change-name-service.service';

describe('ChangeNameServiceService', () => {
  let service: ChangeNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
