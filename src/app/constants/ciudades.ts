export const ciudades = [
    'Bogotá',
    'Medellín',
    'Cali',
    'Barranquilla',
    'Cartagena',
    'Cúcuta',
    'Bucaramanga',
    'Pereira',
    'Santa Marta',
    'Ibagué',
    'Yumbo',
    'Palmira',
    'Popayán',
    'Pasto'
] as const

export type Ciudad = typeof ciudades[number]