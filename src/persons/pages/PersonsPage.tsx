import { PersonList } from "../components/persons/PersonList";
import { usePersons } from "../hooks/usePersons";
import { deletePersonById } from "../helpers/deletePersonById";

export const PersonsPage = () => {
  const { loading, persons, error, setOnDelete } = usePersons();

  const handleDelete = async (id: string) => {
    try {
      await deletePersonById(id);
      setOnDelete(true);
    } catch (err) {
      console.error("Error al eliminar persona:", err);
    }
  };

  return (
    <>
      {loading && <h2 className="text-center">Cargando...</h2>}
      {error && <h5 className="text-center">Error: {error}</h5>}
      <div className="container d-flex mt-3 mb-5 col justify-content-center">
        <PersonList dataList={persons} onDelete={handleDelete} />
      </div>
    </>
  );
};
