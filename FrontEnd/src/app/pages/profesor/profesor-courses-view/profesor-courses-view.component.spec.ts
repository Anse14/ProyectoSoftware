import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesorCoursesViewComponent } from './profesor-courses-view.component';

describe('ProfesorCoursesViewComponent', () => {
  let component: ProfesorCoursesViewComponent;
  let fixture: ComponentFixture<ProfesorCoursesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfesorCoursesViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesorCoursesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
