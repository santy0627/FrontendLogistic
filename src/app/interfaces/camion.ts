import { User } from "./user"
export interface Camion {
    _id: string,
    placa: string,
    capacidadCarga: string,
    disponible?: boolean,
    ubicacionActual: string,
    conductorAsignado?: User | string,
    remesasAsignadas?: string[]
}