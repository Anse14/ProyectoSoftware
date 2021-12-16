import { TestBed } from '@angular/core/testing';

import { ProfesordashboardService } from './profesordashboard.service';

describe('ProfesordashboardService', () => {
  let service: ProfesordashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfesordashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
