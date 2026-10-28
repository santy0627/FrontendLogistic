import { Ciudad } from "../constants/ciudades";

export interface Remesa {
    _id?: string;
    codigo: number;
    cantidad: number;
    pesoTotal: number;
    direccionEntrega: string;
    ciudadEntrega: Ciudad;
    tipoMercancia: string;
    estado?: string;
}