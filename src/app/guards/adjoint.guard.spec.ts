import { TestBed } from '@angular/core/testing';

import { AdjointGuard } from './adjoint.guard';

describe('AdjointGuard', () => {
  let guard: AdjointGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdjointGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
