import { Optional } from "@angular/core";
import { Rubrica } from "./rubricaborrable";
import { Seccion } from "./Seccion";
export interface Curso {
    id: number,
    codigo: string ,
    name: string,
    secciones: Seccion[],
    rubricas: Rubrica [],
}