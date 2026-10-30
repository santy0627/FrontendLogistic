import { Ciudad } from "../constants/ciudades"
import { User } from "./user"
import { Remesa } from "./remesa"
export interface Camion {
    _id: string,
    placa: string,
    capacidadCarga: string,
    disponible?: boolean,
    ubicacionActual: string,
    conductorAsignado?: User | string,
    remesasAsignadas?: Remesa[],
    ciudadOperacion: Ciudad,
    remesasCargadas?: Remesa[]
}