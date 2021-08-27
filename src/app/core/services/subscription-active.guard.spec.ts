import { TestBed, async, inject } from '@angular/core/testing';

import { SubscriptionActiveGuard } from './subscription-active.guard';

describe('SubscriptionActiveGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubscriptionActiveGuard]
    });
  });

  it('should ...', inject([SubscriptionActiveGuard], (guard: SubscriptionActiveGuard) => {
    expect(guard).toBeTruthy();
  }));
});
