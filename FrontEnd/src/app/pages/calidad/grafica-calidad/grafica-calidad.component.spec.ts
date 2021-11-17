import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaCalidadComponent } from './grafica-calidad.component';

describe('GraficaCalidadComponent', () => {
  let component: GraficaCalidadComponent;
  let fixture: ComponentFixture<GraficaCalidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficaCalidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficaCalidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
