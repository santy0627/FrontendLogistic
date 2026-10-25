export interface Remesa {
    _id?: string;
    codigo: number;
    cantidad: number;
    pesoTotal: number;
    direccionEntrega: string;
    ciudadEntrega: string;
    tipoMercancia: string;
    estado?: string;
}