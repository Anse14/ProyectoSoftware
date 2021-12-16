import { Dimension } from "./dimension";
export interface Rubrica{
    id?: string
    actividadBase?: string
    ciclo?: string
    codigo?: string
    criterioDeDesempenho?: string
    numCritDesemp?: string
    evidencia?: string	
    fecha?: string
    semana?: string
    semestre?: string
    status?: boolean
    tipo?: string
    dimensiones?: Dimension[]
}