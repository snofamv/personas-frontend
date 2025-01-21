import { useEffect, useState } from "react";
import { getPersons } from "../helpers/getPersons";

export const usePersons = () => {
  const [persons, setPersons] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPersons = async () => {
    setLoading(true);
    setError(null);

    try {
      const { message } = await getPersons();
      setPersons(message);
    } catch (err) {
      console.error("Error fetching persons:", err);
      setError("Error al obtener los datos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPersons();
  }, []);

  return {
    persons,
    loading,
    error,
  };
};
