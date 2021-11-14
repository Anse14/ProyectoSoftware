import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRubricaCreationComponent } from './create-rubrica-creation.component';

describe('CreateRubricaCreationComponent', () => {
  let component: CreateRubricaCreationComponent;
  let fixture: ComponentFixture<CreateRubricaCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRubricaCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRubricaCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
