import { PersonResponse } from "../../types/Person";

export const setNewPerson = async (person: {}): Promise<any> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/personas/agregar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    if (!response.ok) {
      return {
        status: response.status,
        message: `Ya existe rut`,
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { message: error } as PersonResponse;
  }
};
