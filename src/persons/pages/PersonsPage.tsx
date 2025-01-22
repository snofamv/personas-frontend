import { PersonList } from "../components/persons/PersonList";
import { usePersons } from "../hooks/usePersons";
import { deletePersonById } from "../helpers/deletePersonById";
import { useNavigate } from "react-router";

export const PersonsPage = () => {
  const { loading, persons, error, setOnDelete } = usePersons();
  const navigate = useNavigate();
  const handleDelete = async (id: string) => {
    try {
      await deletePersonById(id);
      setOnDelete(true);
    } catch (err) {
      console.error("Error al eliminar persona:", err);
    }
  };
  const handleUpdatePerson = (id: string) => {
    navigate(`/search/${id}`);
  };

  return (
    <>
      {loading && <h2 className="text-center">Cargando...</h2>}
      {error && <h5 className="text-center">Error: {error}</h5>}
      <div className="sm-container">
        <h1 className="text-center mb-3">Lista de personas</h1>
        <PersonList
          dataList={persons}
          onDelete={handleDelete}
          onClick={handleUpdatePerson}
        />
      </div>
    </>
  );
};
