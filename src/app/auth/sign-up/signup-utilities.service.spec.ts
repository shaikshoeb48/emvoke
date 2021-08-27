import { TestBed } from '@angular/core/testing';

import { SignupUtilitiesService } from './signup-utilities.service';

describe('SignupUtilitiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SignupUtilitiesService = TestBed.get(SignupUtilitiesService);
    expect(service).toBeTruthy();
  });
});
