import { z } from "zod";

// Define las enumeraciones necesarias
export const SexoEnum = z.enum(["M", "F", "N", "D"]); // Sexo: Masculino, Femenino, No Binario, Desconocido
export const NacionalidadEnum = z.enum(["CL", "ARG", "PE", "BR"]); // Agrega las nacionalidades que necesites

// Esquema para Person
export const personSchema = z.object({
//   id: z.string().uuid("El ID debe ser un UUID válido"), // Valida que sea un UUID
  rut: z.string().regex(/^\d{7,8}$/, "El RUT debe tener entre 7 y 8 dígitos"),
  dv: z.string().regex(/^[0-9Kk]$/, "El dígito verificador debe ser un número o 'K'"),
  nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres").max(32, "El nombre no debe superar los 32 caracteres"),
  apaterno: z.string().min(3, "El apellido paterno debe tener al menos 3 caracteres").max(32, "El apellido paterno no debe superar los 32 caracteres"),
  amaterno: z.string().min(3, "El apellido materno debe tener al menos 3 caracteres").max(32, "El apellido materno no debe superar los 32 caracteres"),
  fec_nac: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "La fecha debe estar en formato YYYY-MM-DD"), // Valida formato de fecha
  sexo: SexoEnum, // Usa la enumeración definida
  nacionalidad: NacionalidadEnum, // Usa la enumeración definida
  activo: z.number().int().min(0, "El estado activo debe ser 0 o 1").max(1, "El estado activo debe ser 0 o 1"), // Solo acepta 0 o 1
  estado_cv: z.number().int().min(1, "El estado del CV debe estar entre 1 y 4").max(4, "El estado del CV debe estar entre 1 y 4"), // Valores de 1 a 4
});
