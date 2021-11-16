import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalidadDashboardComponent } from './calidad-dashboard.component';

describe('CalidadDashboardComponent', () => {
  let component: CalidadDashboardComponent;
  let fixture: ComponentFixture<CalidadDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalidadDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalidadDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
