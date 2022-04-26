import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheDeControleAffichageComponent } from './fiche-de-controle-affichage.component';

describe('FicheDeControleAffichageComponent', () => {
  let component: FicheDeControleAffichageComponent;
  let fixture: ComponentFixture<FicheDeControleAffichageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FicheDeControleAffichageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheDeControleAffichageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
