import { TestBed } from '@angular/core/testing';

import { ProfesorcreateService } from './profesorcreate.service';

describe('ProfesorcreateService', () => {
  let service: ProfesorcreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfesorcreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
