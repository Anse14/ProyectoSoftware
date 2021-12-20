import { Injectable } from '@angular/core';
import { Carrera, Curso, GetcarrerasGQL, GetcursosbycarreraGQL } from '@graphql';

@Injectable({
  providedIn: 'root',
})
export class CarreraService {
  carreras: Carrera[] = [];

  constructor(private getCarreras: GetcarrerasGQL) {
    this.getCarreras
      .fetch()
      .toPromise()
      .then((data) => {
        this.carreras = data.data.carrera;
      });
  }
}
