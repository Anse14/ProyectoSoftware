import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RubricaCreationComponent } from './rubrica-creation.component';

describe('RubricaCreationComponent', () => {
  let component: RubricaCreationComponent;
  let fixture: ComponentFixture<RubricaCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RubricaCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RubricaCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
