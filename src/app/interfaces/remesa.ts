import { Ciudad } from '../constants/ciudades';

export interface Remesa {
  _id?: string;
  codigo: number;
  cantidad: number;
  pesoTotal: number;
  direccionDestino: string;
  ciudadDestino: Ciudad;
  tipoMercancia: string;
  estado?: string;
  remitente: string;
  destinatario: string;
  ciudadOrigen: Ciudad;
  barrioDestino: string;
}
