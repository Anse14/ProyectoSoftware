import { TestBed } from '@angular/core/testing';

import { ShowrubricaService } from './showrubrica.service';

describe('ShowrubricaService', () => {
  let service: ShowrubricaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowrubricaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
