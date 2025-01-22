import { Person, PersonResponse } from "../../types/Person";

export const updatePerson = async (person: Person): Promise<any> => {
  console.log(person);
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/personas/actualizar/${person.id}`,
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
