import { Person, PersonResponse } from "../../types/Person";

export const updatePerson = async (person: Person): Promise<any> => {
  try {
    const response = await fetch(
      `http://localhost:5001/api/personas/actualizar/${person.id || ""}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      }
    );

    if (!response.ok) {
      return {
        status: response.status,
        message: `Error al actualizar persona`,
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { message: error } as PersonResponse;
  }
};
