import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RubricaCalidadComponent } from './rubrica-calidad.component';

describe('RubricaCalidadComponent', () => {
  let component: RubricaCalidadComponent;
  let fixture: ComponentFixture<RubricaCalidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RubricaCalidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RubricaCalidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
