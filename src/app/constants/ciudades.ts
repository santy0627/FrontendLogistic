export const barriosCiudades = {
  Bogotá: [
    'Chapinero', 'Chicó Norte', 'Teusaquillo', 'La Candelaria',
    'Kennedy', 'Fontibón', 'Modelia', 'Montevideo', 'Suba'
  ],
  Medellín: [
    'El Poblado', 'Laureles', 'Estadio', 'Belén', 'Guayabal',
    'Manrique', 'Aranjuez', 'Robledo'
  ],
  Cali: [
    'Acopi', 'Granada', 'San Antonio', 'San Fernando', 'El Peñón',
    'Ciudad Jardín', 'Aguablanca', 'Siloé', 'Chipichape'
  ],
  Barranquilla: [
    'El Prado', 'Alto Prado', 'Boston', 'Riomar',
    'Villa Country', 'Recreo', 'Centro'
  ],
  Cartagena: [
    'Centro', 'Getsemaní', 'Manga', 'Bocagrande',
    'Castillogrande', 'El Bosque', 'Crespo'
  ],
  Cúcuta: [
    'Centro', 'Caobos', 'La Riviera', 'Guaimaral', 'Atalaya'
  ],
  Bucaramanga: [
    'Centro', 'Cabecera del Llano', 'Sotomayor',
    'San Alonso', 'Provenza'
  ],
  Pereira: [
    'Centro', 'Pinares', 'Álamos', 'Cuba', 'Maraya'
  ],
  'Santa Marta': [
    'Centro Histórico', 'Bavaria', 'El Rodadero', 'Gaira', 'Taganga'
  ],
  Ibagué: [
    'Centro', 'La Pola', 'Belén', 'Jordán', 'Mirolindo'
  ],
  Yumbo: [
    'Belalcázar', 'Buenos Aires', 'La Estancia',
    'Panorama', 'Arroyohondo'
  ],
  Palmira: [
    'Centro', 'Las Mercedes', 'El Prado', 'Zamorano', 'Industrial'
  ],
  Popayán: [
    'Centro Histórico', 'El Cadillal', 'La Esmeralda',
    'Catay', 'Campobello'
  ],
  Pasto: [
    'Centro', 'Santiago', 'Las Cuadras', 'Morasurco', 'Tamasagra'
  ]
}as const;

export type Ciudad = keyof typeof barriosCiudades;
export const ciudades = Object.keys(barriosCiudades) as Ciudad[]