import { TestBed } from '@angular/core/testing';

import { CursosprofesorService } from './cursosprofesor.service';

describe('CursosprofesorService', () => {
  let service: CursosprofesorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CursosprofesorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
