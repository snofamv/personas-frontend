import { deletePersonById } from "../helpers/deletePersonById";

export const useDelete = () => {
  const onDelete = async (id: string) => {
    try {
      const results = await deletePersonById(id);
      console.log(results);
    } catch (error: any) {
      console.error("Hubo un error en la peticion: ", error);
    }
  };

  return {
    onDelete,
  };
};
