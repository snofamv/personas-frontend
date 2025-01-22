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
  sexo: Sexo;
  nacionalidad: Nacionalidad;
  activo: number;
  estado_cv: number;
}

export enum Nacionalidad {
  CL = "Chile",
  NA = "Sin nacionalidad",
}

export enum Sexo {
  F = "F",
  M = "M",
  NB = "N",
  D = "D",
}

export enum EstadoActivo {
  Habilitado = 1,
  Deshabilitado = 0,
}
