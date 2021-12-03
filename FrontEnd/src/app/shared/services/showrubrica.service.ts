import { Injectable } from '@angular/core';
import { Rubrica } from '@shared/interfaces/rubricaborrable';
import { Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowrubricaService {

  constructor() { }
  getRubrica(codigo: string, rubricas: Rubrica[]): Observable<Rubrica>{
    const rubrica = rubricas.find( h => h.codigo == codigo)!;
    return of(rubrica);
  }
}
