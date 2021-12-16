import { TestBed } from '@angular/core/testing';

import { CalidadresultadosService } from './calidadresultados.service';

describe('CalidadresultadosService', () => {
  let service: CalidadresultadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalidadresultadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
