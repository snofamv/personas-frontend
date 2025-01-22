import { useEffect } from "react";
import { PersonList } from "../components/persons/PersonList";
import { useDelete } from "../hooks/useDelete";
import { usePersons } from "../hooks/usePersons";
import { deletePersonById } from "../helpers/deletePersonById";

export const PersonsPage = () => {
  const { loading, persons, error, setLoading } = usePersons();
  const handleDelete = async (id: string) => {
    setLoading(true);
    await deletePersonById(id);
    setLoading(false);
  };

  return (
    <>
      {loading && <h2 className="text-center">Cargando</h2>}
      {error && <h5 className="text-center">Error</h5>}
      <div className="container d-flex mt-3 mb-5 col justify-content-center">
        <PersonList dataList={persons} onDelete={handleDelete} />
      </div>
    </>
  );
};
