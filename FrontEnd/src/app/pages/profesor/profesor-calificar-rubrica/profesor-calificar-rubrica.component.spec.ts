import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesorCalificarRubricaComponent } from './profesor-calificar-rubrica.component';

describe('ProfesorCalificarRubricaComponent', () => {
  let component: ProfesorCalificarRubricaComponent;
  let fixture: ComponentFixture<ProfesorCalificarRubricaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfesorCalificarRubricaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesorCalificarRubricaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
