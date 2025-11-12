export interface Vehiculo {
  id?: number;
  modelo: string;
  marca_id: number;
  numero_puertas: number;
  color?: string;
  propietarios?: number[]; // ids de personas
}
