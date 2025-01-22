
import { PersonResponse } from "../../types/Person";

export const getPersons = async (): Promise<PersonResponse> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/personas/`);

    if (!response.ok) {
      // Manejo de errores basado en el código de estado HTTP
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data; // Asumiendo que `data.message` contiene el arreglo de personas
  } catch (error) {
    console.error("Error fetching persons:", error);
    return { message: error, status: 500 } as PersonResponse; // Retorna un arreglo vacío si ocurre un error
  }
};
