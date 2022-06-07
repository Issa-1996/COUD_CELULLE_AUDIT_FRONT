import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheDeControleComponent } from './fiche-de-controle.component';

describe('FicheDeControleComponent', () => {
  let component: FicheDeControleComponent;
  let fixture: ComponentFixture<FicheDeControleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FicheDeControleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheDeControleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
