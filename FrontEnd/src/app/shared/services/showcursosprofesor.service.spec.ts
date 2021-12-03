import { TestBed } from '@angular/core/testing';

import { ShowcursosprofesorService } from './showcursosprofesor.service';

describe('ShowcursosprofesorService', () => {
  let service: ShowcursosprofesorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowcursosprofesorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
