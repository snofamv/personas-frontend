
export const getPersonById = async (id: string): Promise<any> => {
  try {
    const response = await fetch(`http://localhost:5001/api/personas/id/${id}`);

    if (!response.ok) {
      // Manejo de errores basado en el código de estado HTTP
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    const { message } = data;
    return message; // Asumiendo que `data.message` contiene el arreglo de personas
  } catch (error) {
    console.error("Error fetching persons:", error);
    return [{ message: error, status: 500 }]; // Retorna un arreglo vacío si ocurre un error
  }
};
