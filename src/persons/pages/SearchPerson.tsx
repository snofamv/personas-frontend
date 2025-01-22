import { Link, useNavigate, useParams } from "react-router";
import { useForm } from "../hooks";
import { useSearch } from "../hooks/useSearch";
import { Person } from "../../types/Person";
import { PersonCard } from "../components/persons/PersonCard";
const initialFormData = {
  searchText: "",
};
interface Props {
  onDelete: () => void;
}
export const SearchPerson = ({ onDelete }: Props) => {
  // HOOKS & VARIABLES
  const navigate = useNavigate();
  const { rut: queryParam = "" } = useParams();
  const { error, loading, person } = useSearch(queryParam);
  const { onInputChange, searchText, onResetForm } = useForm(initialFormData);

  const onSearch = (): void => {
    event?.preventDefault();
    if (searchText.trim().length <= 1) return;
    onResetForm();
    navigate(`/search/${searchText}`);
  };
  const showSearch: boolean =
    person.length === 0 && queryParam === "" ? true : false;

  const handleUpdatePerson = (values: any) => {
    navigate(`/update/${values.rut}`);
  };
  return (
    <>
      <h1>
        Buscar persona
        <Link className="btn btn-primary ms-3" to={"/"}>
          Volver
        </Link>
      </h1>
      <hr />
      <div className="row">
        <div className="col-5">
          <h4>Buscar RUT</h4>
          <hr />
          <form onSubmit={onSearch}>
            <input
              type="text"
              name="searchText"
              placeholder="Encuentra a una persona..."
              className="form-control"
              onChange={onInputChange}
              value={searchText}
              autoComplete="off"
              minLength={8}
            />
            <button type="submit" className="btn btn-outline-primary mt-2">
              Buscar
            </button>
          </form>
        </div>
        <div className="col-7">
          <h4>Resultado</h4>
          <hr />
          {error && <h5 className="text-center">Error</h5>}

          <div className={`col`}>
            {/* ESTO SIGUE APARECIENDO EN EL DOM */}
            <div
              className={`alert alert-primary text-center ${
                showSearch && loading ? "" : "d-none"
              }`}
            >
              <p>Cargando...</p>
            </div>
            <div
              className={`alert alert-primary text-center ${
                showSearch ? "" : "d-none"
              }`}
            >
              <p>Buscar persona por RUT</p>
            </div>
            <div
              className={`alert alert-danger text-center ${
                !showSearch && !loading && person[0]?.id === undefined
                  ? ""
                  : "d-none"
              }`}
            >
              <p>
                No existen resultados con RUT: <b>{queryParam}</b>
              </p>
            </div>
            {person &&
              person.length > 0 &&
              person[0].id &&
              person.map((person: Person) => (
                <PersonCard
                  key={person.id}
                  person={person}
                  onDelete={onDelete}
                  showExtraButtons={false}
                  onClick={handleUpdatePerson}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPerson;
