import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControleursComponent } from './controleurs.component';

describe('ControleursComponent', () => {
  let component: ControleursComponent;
  let fixture: ComponentFixture<ControleursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControleursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControleursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
