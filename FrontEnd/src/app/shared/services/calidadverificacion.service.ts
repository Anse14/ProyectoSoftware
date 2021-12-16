import { Injectable } from '@angular/core';
import { Curso, VerifyGQL } from '@graphql';
import { Rubrica } from '@graphql';
import { GetallcursosGQL } from '@graphql';
import { UserService } from './user.service';
import { UtilsfunctionsService } from './utilsfunctions.service';

@Injectable({
  providedIn: 'root'
})
export class CalidadverificacionService {
  ready = false;
  cursos: Curso[] = [];
  rubricaready = false;
  curso: Curso = { nombre: null };

  rubrica: Rubrica = {
    id : "",
  };
  rubricaindex: Number;

  constructor(
    private user: UserService,
    private getcursos: GetallcursosGQL,
    private utilfunctions: UtilsfunctionsService,
    private verify: VerifyGQL) {
    this.getCursos();
  }

  ngOnInit(): void {
  }

  actualrubricaindex(index: Number) {
    this.rubricaindex = index;
    return "Rubrica " + index.toString();
  }

  getCursos() {
    this.cursos = [];
    this.getcursos.fetch().subscribe((data) => {
      this.cursos = data.data.curso;
      this.filtCursos();
    });
  }
  dimensionesid: string[] = [];

  async getRubrica(id: string) {
    this.dimensionesid = [];
    if (id != this.rubrica.id) {
      this.rubrica = await this.utilfunctions.updaterubrica(id);
      this.rubricaready = true;
    }
  }

  filtCursos(): void {
    var newcursos: Curso[] = Array<Curso>();
    for (let curso of this.cursos) {
      for (let rubrica of curso.rubricas) {
        if (rubrica.status == false) {
          newcursos.push(curso);
          break;
        }
      }
    }
    this.cursos = newcursos;
    this.ready = true;
  }

  acceptRubric() {
    this.verify.mutate({ ID: this.rubrica.id, CALIDAD: "83acf02a-3388-434a-af14-1334c7fd8e46", BOOL: true }).subscribe(data => {
      this.rubrica.status = true;
      location.reload();
    });
    this.filtCursos();
  }

  deniedRubric() {
    this.verify.mutate({ ID: this.rubrica.id, CALIDAD: "83acf02a-3388-434a-af14-1334c7fd8e46", BOOL: false }).subscribe(data => {
      console.log("something");
      this.rubrica.status = null;
      location.reload();
    });;
    this.filtCursos();
  }

}
