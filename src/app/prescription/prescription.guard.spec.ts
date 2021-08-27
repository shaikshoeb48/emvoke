import { TestBed, async, inject } from '@angular/core/testing';

import { PrescriptionGuard } from './prescription.guard';

describe('PrescriptionGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrescriptionGuard]
    });
  });

  it('should ...', inject([PrescriptionGuard], (guard: PrescriptionGuard) => {
    expect(guard).toBeTruthy();
  }));
});
