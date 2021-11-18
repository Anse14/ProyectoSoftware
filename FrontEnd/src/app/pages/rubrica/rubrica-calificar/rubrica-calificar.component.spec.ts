import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RubricaCalificarComponent } from './rubrica-calificar.component';

describe('RubricaCalificarComponent', () => {
  let component: RubricaCalificarComponent;
  let fixture: ComponentFixture<RubricaCalificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RubricaCalificarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RubricaCalificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
