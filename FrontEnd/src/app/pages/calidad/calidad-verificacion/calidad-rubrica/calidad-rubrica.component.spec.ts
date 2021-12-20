import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalidadRubricaComponent } from './calidad-rubrica.component';

describe('CalidadRubricaComponent', () => {
  let component: CalidadRubricaComponent;
  let fixture: ComponentFixture<CalidadRubricaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalidadRubricaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalidadRubricaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
