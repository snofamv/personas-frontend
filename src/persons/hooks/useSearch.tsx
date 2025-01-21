import { useEffect, useState } from "react";
import { getPersonById } from "../helpers/getPersonById";
import { Person } from "../../types/Person";

export const useSearch = (userId: string) => {
  const [person, setPerson] = useState<Person[]>([]); // Estado para los datos de la persona
  const [loading, setLoading] = useState<boolean>(false); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores

  useEffect(() => {
    const fetchPerson = async () => {
      setLoading(true); // Inicia el estado de carga
      setError(null); // Resetea el error al intentar buscar

      try {
        if (!userId || userId.length === 0 || userId.length < 8) {
          setPerson([]);
          return;
        }

        const result = await getPersonById(userId);
        setPerson(result); // Establece los datos obtenidos
      } catch (err: any) {
        console.error("Error fetching person:", err);
        setError(err.message || "Error al buscar la persona"); // Manejo de error
      } finally {
        setLoading(false); // Finaliza el estado de carga
      }
    };

    fetchPerson();
  }, [userId]); // Se ejecuta cada vez que `userId` cambia

  return { person, loading, error }; // Devuelve los estados relevantes
};
