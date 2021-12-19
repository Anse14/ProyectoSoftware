import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesorCrearRubricaComponent } from './profesor-crear-rubrica.component';

describe('ProfesorCrearRubricaComponent', () => {
  let component: ProfesorCrearRubricaComponent;
  let fixture: ComponentFixture<ProfesorCrearRubricaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfesorCrearRubricaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesorCrearRubricaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
