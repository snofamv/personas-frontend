import { Link, useNavigate, useParams } from "react-router";
import { useForm } from "../hooks";
import { useSearch } from "../hooks/useSearch";
import { Person } from "../../types/Person";
import { PersonCard } from "../components/persons/PersonCard";
import Swal from "sweetalert2";
import { Button, Grid, Grid2, Typography } from "@mui/material";
import { Loader } from "../components/ui/Loader";
const initialFormData = {
  searchText: "",
};
export const SearchPerson = () => {
  // HOOKS & VARIABLES
  const navigate = useNavigate();
  const { rut: queryParam = "" } = useParams();
  const { error, loading, person } = useSearch(queryParam);
  const { onInputChange, searchText, onResetForm } = useForm(initialFormData);

  const onSearch = (): void => {
    event?.preventDefault();
    if (searchText.trim().length < 7 || searchText.trim().length > 8) {
      Swal.fire({
        title: "Busqueda",
        html: `<h4>El rut ingresado para la busqueda es incorrecto</h4><br><p>Agregar un rut entre 7 y 8 caracters</p>`,
        icon: "warning",
        confirmButtonText: "Volver",
      });
      return;
    }

    onResetForm();
    navigate(`/search/${searchText}`);
  };

  const handleUpdatePerson = (values: any) => {
    navigate(`/update/${values.rut}`);
  };
  return (
    <Grid container display={"flex"} flexDirection={"column"}>
      <Grid item display={"flex"} flexDirection={"column"}>
        <Typography variant="h4">Buscar RUT</Typography>
        <Link to={"/"}>
          <Button variant="contained">Volver</Button>
        </Link>
      </Grid>
      <hr />
      <Grid container>
        <form onSubmit={onSearch}>
          <input
            type="string"
            name="searchText"
            placeholder="Encuentra a una persona..."
            className="form-control"
            onChange={onInputChange}
            value={searchText}
            minLength={1}
            maxLength={8}
            pattern="^[0-9]{1,8}$" // Expresión regular para permitir solo letras y números (1 a 8 caracteres)
            title="Solo se permiten numeros"
          />
          <button type="submit" className="btn btn-outline-primary mt-2">
            Buscar
          </button>
        </form>
      </Grid>

      <Grid>
        {/* DATA LIST PERSONAS  */}
        <Grid>
          {loading && !error && <Loader />}
          {error && !loading && <Typography variant="h5">Error</Typography>}
          <Typography variant="h4" textAlign={"end"}>
            Resultados
          </Typography>
        </Grid>
        <hr />
        {person &&
          person.length > 0 &&
          person[0].id &&
          person.map((person: Person) => (
            <PersonCard
              key={person.id}
              person={person}
              showExtraButtons={false}
              onClick={handleUpdatePerson}
            />
          ))}

        {!loading && person.length === 0 && queryParam.length >= 7  && (
          <Grid2>
            <Typography variant="h4" textAlign={"center"}>
              No existen resultados con rut:{" "}
              <Typography variant="h5">{queryParam}</Typography>
            </Typography>
          </Grid2>
        )}
      </Grid>
    </Grid>
  );
};

export default SearchPerson;

// <div className="col-7">
// <h4>Resultado</h4>
// <hr />
// {error && <h5 className="text-center">Error</h5>}

// <div className={`col`}>
//   {/* ESTO SIGUE APARECIENDO EN EL DOM */}
//   <div
//     className={`alert alert-primary text-center ${
//       showSearch && loading ? "" : "d-none"
//     }`}
//   >
//     <p>Cargando...</p>
//   </div>
//   <div
//     className={`alert alert-primary text-center ${
//       showSearch ? "" : "d-none"
//     }`}
//   >
//     <p>Buscar persona por RUT</p>
//   </div>
//   <div
//     className={`alert alert-danger text-center ${
//       !showSearch && !loading && person[0]?.id === undefined
//         ? ""
//         : "d-none"
//     }`}
//   >
//     <p>
//       No existen resultados con RUT: <b>{queryParam}</b>
//     </p>
//   </div>
