import { Calificacion } from "./califacaciones";
export interface Dimension {
    id?: string;
    descripcion?:string;
    calificaciones?: Calificacion[];
}