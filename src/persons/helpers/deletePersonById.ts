import { PersonResponse } from "../../types/Person";

export const deletePersonById = async (id: string): Promise<any> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/personas/eliminar/${id || ""}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      return {
        status: response.status,
        message: `Error al eliminar persona`,
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { message: error } as PersonResponse;
  }
};
