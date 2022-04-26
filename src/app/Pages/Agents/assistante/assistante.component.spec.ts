import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistanteComponent } from './assistante.component';

describe('AssistanteComponent', () => {
  let component: AssistanteComponent;
  let fixture: ComponentFixture<AssistanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssistanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
