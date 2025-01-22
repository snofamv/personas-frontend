import { useEffect, useState } from "react";
import { getPersons } from "../helpers/getPersons";

export const usePersons = () => {
  const [persons, setPersons] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [onDelete, setOnDelete] = useState(false);
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

  useEffect(() => {
    if (onDelete) {
      fetchPersons();
      setOnDelete(false);
    }
  }, [onDelete]);

  return {
    persons,
    loading,
    error,
    onDelete,
    setOnDelete,
    setLoading,
  };
};
