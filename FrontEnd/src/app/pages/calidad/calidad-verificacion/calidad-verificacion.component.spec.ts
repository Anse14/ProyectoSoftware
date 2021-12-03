import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalidadVerificacionComponent } from './calidad-verificacion.component';

describe('CalidadVerificacionComponent', () => {
  let component: CalidadVerificacionComponent;
  let fixture: ComponentFixture<CalidadVerificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalidadVerificacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalidadVerificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
