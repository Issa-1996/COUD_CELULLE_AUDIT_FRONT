import { TestBed } from '@angular/core/testing';

import { AssistanteGuard } from './assistante.guard';

describe('AssistanteGuard', () => {
  let guard: AssistanteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AssistanteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
