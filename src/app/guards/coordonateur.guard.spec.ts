import { TestBed } from '@angular/core/testing';

import { CoordonateurGuard } from './coordonateur.guard';

describe('CoordonateurGuard', () => {
  let guard: CoordonateurGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CoordonateurGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
