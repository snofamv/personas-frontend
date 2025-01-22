import { useEffect, useState } from "react";
import { getPersons } from "../helpers/getPersons";

export const usePersons = () => {
  const [persons, setPersons] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPersons = async () => {
      setLoading(true);
      setError(null);

      try {
        const { message } = await getPersons();
        const filterData = message.filter((person) => person.activo === 1);
        setPersons(filterData);
      } catch (err) {
        console.error("Error fetching persons:", err);
        setError("Error al obtener los datos");
      } finally {
        setLoading(false);
      }
    };
    fetchPersons();
  }, [loading]);

  return {
    persons,
    loading,
    error,
    setLoading,
  };
};
