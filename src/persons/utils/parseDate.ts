export const parseDate = (isoDate: string): string => {
  const date = new Date(isoDate); // Crear un objeto Date

  // Formatear la fecha al estilo deseado
  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
