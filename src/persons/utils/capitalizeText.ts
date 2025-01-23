export const capitalizeText = (text: string) =>
  text
    .split(" ") // Separar por palabras
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) //por cada palabra capitalizo y retorno la palabra completa a partir de la posicion 1 en lower case para achicar
    .join(" "); // Se agrega nuevamente palabra

    export const formatRut = (rutParam: string): string => {
      // Dividir el RUT en cuerpo y dígito verificador
      const [rut, dv] = rutParam.split("-");
    
      // Agregar puntos al cuerpo del RUT
      const formattedRut = rut.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    
      // Retornar el RUT formateado
      return `${formattedRut}-${dv}`;
    };