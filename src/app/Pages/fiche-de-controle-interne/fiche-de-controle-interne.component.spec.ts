import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheDeControleInterneComponent } from './fiche-de-controle-interne.component';

describe('FicheDeControleInterneComponent', () => {
  let component: FicheDeControleInterneComponent;
  let fixture: ComponentFixture<FicheDeControleInterneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FicheDeControleInterneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheDeControleInterneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
