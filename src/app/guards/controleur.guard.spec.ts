import { TestBed } from '@angular/core/testing';

import { ControleurGuard } from './controleur.guard';

describe('ControleurGuard', () => {
  let guard: ControleurGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ControleurGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
