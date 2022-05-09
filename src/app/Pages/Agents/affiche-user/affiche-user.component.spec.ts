import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficheUserComponent } from './affiche-user.component';

describe('AfficheUserComponent', () => {
  let component: AfficheUserComponent;
  let fixture: ComponentFixture<AfficheUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficheUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficheUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
