import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourierArriverComponent } from './courier-arriver.component';

describe('CourierArriverComponent', () => {
  let component: CourierArriverComponent;
  let fixture: ComponentFixture<CourierArriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourierArriverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourierArriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
