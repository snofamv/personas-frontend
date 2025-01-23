export interface PersonResponse {
  status: number;
  message: Person[];
}

export interface Person {
  id: string;
  rut: string;
  dv: string;
  nombre: string;
  apaterno: string;
  amaterno: string;
  fec_nac: string;
  sexo: string;
  nacionalidad: string;
  activo: number;
  estado_cv: number;
}

export enum Generos {
  M = "Masculino",
  F = "Femenino",
  D = "Desconocido", // Opcional
}

export enum EstadosCiviles {
  "Soltero" = 1,
  "Casado" = 2,
  "Divorciado" = 3,
  "Viudo" = 4,
}
