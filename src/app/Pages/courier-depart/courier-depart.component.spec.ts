import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourierDepartComponent } from './courier-depart.component';

describe('CourierDepartComponent', () => {
  let component: CourierDepartComponent;
  let fixture: ComponentFixture<CourierDepartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourierDepartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourierDepartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
