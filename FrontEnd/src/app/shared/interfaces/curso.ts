import { Rubrica } from "./rubrica";
import { Seccion } from "./Seccion";
export interface Curso {
    id?: string,
    codigo?: string,
    nombre?: string,
    secciones?: Seccion[],
    rubricas?: Rubrica[],
}