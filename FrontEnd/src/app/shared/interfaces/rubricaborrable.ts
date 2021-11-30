import { Dimension } from "./dimension";
export interface Rubrica{

    profesor: string,
    nivel: number,
    actividad: string
    ciclo: string
    codigo: string
    criterio: string
    numCritDesemp?: string
    evidencia?: string	
    fecha?: string
    semana?: string
    semestre?: string
    status?: boolean
    tipo?: string
    cd: string
    dimensiones: Dimension[];
}