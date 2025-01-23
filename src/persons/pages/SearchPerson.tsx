import { Link, useNavigate, useParams } from "react-router";
import { useForm } from "../hooks";
import { useSearch } from "../hooks/useSearch";
import { Person } from "../../types/Person";
import { PersonCard } from "../components/persons/PersonCard";
import Swal from "sweetalert2";
import { Button, Grid, TextField, Typography } from "@mui/material";
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
      onResetForm();
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
      <Link to={"/"}>
        <Button variant="contained">Volver</Button>
      </Link>
      <Grid container mt={1}>
        <form onSubmit={onSearch}>
          <Grid container mt={1} flexDirection={"row"} display={"flex"} gap={1}>
            <TextField
              id="searchText"
              name="searchText"
              type="text"
              label="Ingrese rut"
              placeholder="12345678"
              InputLabelProps={{ shrink: true }}
              value={searchText}
              onChange={onInputChange}
              inputProps={{ maxLength: 8 }} // Establece el límite de caracteres aquí
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                height: "50px", // Ajusta la altura
                width: "120px", // Ajusta el ancho
                fontSize: "16px", // Ajusta el tamaño de la fuente
              }}
            >
              Buscar
            </Button>
            <Button
              onClick={onResetForm}
              type="button"
              fullWidth
              variant="outlined"
              color="inherit"
              sx={{
                height: "50px", // Ajusta la altura
                width: "120px", // Ajusta el ancho
                fontSize: "16px", // Ajusta el tamaño de la fuente
              }}
            >
              Limpiar
            </Button>
          </Grid>
        </form>
      </Grid>

      <Grid item>
        <Typography variant="h4" textAlign={"end"}>
          Resultados
        </Typography>
        <hr />
        {loading && !error && <Loader />}
        {error && !loading && <Typography variant="h5">Error</Typography>}
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

        {!loading && person.length === 0 && queryParam.length >= 7 && (
          <Typography variant="h4" textAlign={"center"}>
            No existe rut:{queryParam}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default SearchPerson;
