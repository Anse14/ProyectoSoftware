import { TestBed } from '@angular/core/testing';

import { CalidadverificacionService } from './calidadverificacion.service';

describe('CalidadverificacionService', () => {
  let service: CalidadverificacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalidadverificacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
