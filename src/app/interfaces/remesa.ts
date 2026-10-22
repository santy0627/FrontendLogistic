export interface Remesa {
    id?: number;
    codigo: number;
    cantidad: number;
    pesoTotal: number;
    direccionEntrega: string;
    ciudadEntrega: string;
    tipoMercancia: string;
    estado?: string;
}