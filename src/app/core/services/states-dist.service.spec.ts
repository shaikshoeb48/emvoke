import { TestBed } from '@angular/core/testing';

import { StatesDistService } from './states-dist.service';

describe('StatesDistService', () => {
  let service: StatesDistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatesDistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
