import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRubricaComponent } from './create-rubrica.component';

describe('CreateRubricaComponent', () => {
  let component: CreateRubricaComponent;
  let fixture: ComponentFixture<CreateRubricaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRubricaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRubricaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
