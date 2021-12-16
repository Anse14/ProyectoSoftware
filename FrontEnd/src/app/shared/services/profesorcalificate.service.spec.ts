import { TestBed } from '@angular/core/testing';

import { ProfesorcalificateService } from './profesorcalificate.service';

describe('ProfesorcalificateService', () => {
  let service: ProfesorcalificateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfesorcalificateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
