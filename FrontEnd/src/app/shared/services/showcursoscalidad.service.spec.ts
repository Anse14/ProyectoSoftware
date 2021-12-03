import { TestBed } from '@angular/core/testing';

import { Showcursoscalidad } from './showcursoscalidad.service';

describe('ShowrubricaService', () => {
  let service: Showcursoscalidad;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Showcursoscalidad);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
