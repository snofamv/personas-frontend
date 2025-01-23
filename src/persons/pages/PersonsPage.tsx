import { Grid, Typography } from "@mui/material";
import DataTable from "../components/table/DataTable";
import { Loader } from "../components/ui/Loader";
import { usePersons } from "../hooks";
import { useNavigate } from "react-router";
import { deletePersonById } from "../helpers/deletePersonById";
// import { useNavigate } from "react-router";
// import { deletePersonById } from "../helpers/deletePersonById";

export const PersonsPage = () => {
  const { loading, persons, error, setOnDelete } = usePersons();
  const navigate = useNavigate();
  const handleDeletePerson = async (id: string) => {
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
    <Grid
      container
      justifyContent="center"
      display="flex"
      sx={{ minHeight: "100vh" }} // Ajusta según el tamaño deseado
    >
      {loading && <Loader />}
      {error && <Typography variant="h2">Ops.. Hubo un error.</Typography>}
      {!loading && !error && persons && persons.length > 0 && (
        <DataTable
          dataList={persons}
          onDelete={handleDeletePerson}
          onUpdate={handleUpdatePerson}
        />
      )}
      {!loading && !error && persons && persons.length === 0 && (
        <Typography variant="h2" style={{ marginTop: 100 }}>
          No existen registros
        </Typography>
      )}
    </Grid>
  );
};
