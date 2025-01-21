import { PersonList } from "../components/persons/PersonList";
import { usePersons } from "../hooks/usePersons";

export const PersonsPage = () => {
  const { loading, persons, error } = usePersons();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error...</p>;
  return (
    <div className="container justify-content-center d-flex mt-3 mb-5">
      <PersonList dataList={persons} />
    </div>
  );
};
