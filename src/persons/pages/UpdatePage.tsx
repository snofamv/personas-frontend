import { Link, useNavigate, useParams } from "react-router";
import { Person } from "../../types/Person";
import { useForm } from "../hooks";
import { useSearch } from "../hooks/useSearch";
import { useEffect, useState } from "react";
import { personSchema } from "../schemas";
import { updatePerson } from "../helpers/updatePerson";
import { getDVRut } from "../utils";
import Swal from "sweetalert2";
import { Button, Grid, MenuItem, TextField } from "@mui/material";
import { Loader } from "../components/ui/Loader";

export const UpdatePage = () => {
  // HOOKS & VARIABLES
  const navigate = useNavigate();
  const { rut: queryParam = "" } = useParams();
  const { error, loading, person } = useSearch(queryParam);
  const [inputRut, setInputRut] = useState({ body: queryParam, dv: "0" });
  const handleChangeRut = (e: any) => {
    const { value } = e.target;
    const rutBody = value.replace(/\D/g, "");
    const dv = rutBody.length > 0 ? getDVRut(rutBody) : "";
    setInputRut({ body: rutBody, dv });
  };
  const {
    onResetForm,
    setFormValues,
    onInputChange,
    nombre,
    apaterno,
    amaterno,
    estado_cv,
    nacionalidad,
    sexo,
    fec_nac,
    id,
    activo,
  } = useForm({
    nombre: "",
    apaterno: "",
    amaterno: "",
    fec_nac: "",
    rut: "",
    dv: "",
    sexo: "",
    estado_cv: 1,
    activo: 0,
    id: "",
    nacionalidad: "",
  });

  useEffect(() => {
    if (person && person.length > 0) {
      const rutBody = queryParam.replace(/\D/g, "");
      const dv = rutBody.length > 0 ? getDVRut(rutBody) : "";
      setInputRut({ body: rutBody, dv });
      setFormValues({ ...person[0] });
    }
  }, [person, queryParam]);

  const handleUpdateForm = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData: Person = {
      nombre,
      apaterno,
      amaterno,
      fec_nac,
      rut: inputRut.body,
      dv: inputRut.dv,
      sexo,
      estado_cv: parseInt(estado_cv, 10),
      activo: parseInt(activo, 10),
      nacionalidad,
      id,
    };
    const result = personSchema.safeParse(formData);
    let errors = "";
    if (!result.success) {
      result.error.issues.forEach(({ message }) => {
        errors += `*${message}*<br>`; // Añadir salto de línea HTML
      });
      Swal.fire({
        title: "Error!",
        html: `<h5>Error al registrar datos</h5><br>${errors}`,
        icon: "warning",
        confirmButtonText: "Volver",
      });

      return;
    }

    const response = await updatePerson(formData);
    if (response.status === 404) {
      Swal.fire({
        title: "Error al actualizar!",
        html: `<h5>Error no se pudo actualizar la persona</h5><br>${errors}`,
        icon: "error",
        confirmButtonText: "Volver",
        didOpen: () => {
          setTimeout(() => {
            // Cerrar la alerta
            Swal.close();
            // Redirigir
            navigate("/");
          }, 2000); // 2 segundos antes de cerrar y redirigir
        },
      });
      return;
    }
    Swal.fire({
      title: "Actualizacion exitosa!",
      html: `<h4>La persona fue actualizada exitosamente</h4><br><p>Serás redireccionado en breve</p>`,
      icon: "success",
      confirmButtonText: "Volver",
      didOpen: () => {
        setTimeout(() => {
          // Cerrar la alerta
          Swal.close();
          // Redirigir
          navigate("/");
        }, 2000); // 2 segundos antes de cerrar y redirigir
      },
    });
  };
  {
    loading && <Loader />;
  }
  {
    error && <h5 className="text-center">Error</h5>;
  }
  return (
    <Grid>
      <Grid item sx={{ mb: 2 }}>
        <Link to={"/"}>
          <Button variant="contained">Volver</Button>
        </Link>
      </Grid>

      <form
        onSubmit={handleUpdateForm}
        style={{
          padding: "16px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          margin: "0px",
        }}
      >
        <h3 style={{ marginBottom: "16px" }}>Actualizar datos personales</h3>

        {/* RUT */}
        <div style={{ marginBottom: "16px" }}>
          <label
            htmlFor="rut"
            style={{ display: "block", marginBottom: "8px" }}
          >
            RUT
          </label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <TextField
              fullWidth
              id="rut"
              name="rut"
              placeholder="RUT sin dígito verificador"
              value={inputRut.body}
              onChange={handleChangeRut}
              inputProps={{ maxLength: 8, "aria-label": "Campo de RUT" }}
              sx={{ marginRight: "8px" }}
            />
            <span style={{ margin: "0 8px" }}>-</span>
            <TextField
              id="dv"
              name="dv"
              placeholder="DV"
              value={inputRut.dv}
              onChange={handleChangeRut}
              disabled
              inputProps={{ maxLength: 1, "aria-label": "Campo de DV" }}
              sx={{ width: "60px" }}
            />
          </div>
        </div>

        {/* Nombre */}
        <div style={{ marginBottom: "16px" }}>
          <TextField
            fullWidth
            id="nombre"
            name="nombre"
            label="Nombre"
            value={nombre}
            onChange={onInputChange}
          />
        </div>

        {/* Apellido Paterno */}
        <div style={{ marginBottom: "16px" }}>
          <TextField
            fullWidth
            id="apaterno"
            name="apaterno"
            label="Apellido Paterno"
            value={apaterno}
            onChange={onInputChange}
          />
        </div>

        {/* Apellido Materno */}
        <div style={{ marginBottom: "16px" }}>
          <TextField
            fullWidth
            id="amaterno"
            name="amaterno"
            label="Apellido Materno"
            value={amaterno}
            onChange={onInputChange}
          />
        </div>

        {/* Fecha de Nacimiento */}
        <div style={{ marginBottom: "16px" }}>
          <TextField
            fullWidth
            id="fec_nac"
            name="fec_nac"
            type="date"
            label="Fecha de Nacimiento"
            InputLabelProps={{ shrink: true }}
            value={fec_nac}
            onChange={onInputChange}
          />
        </div>

        {/* Sexo */}
        <div style={{ marginBottom: "16px" }}>
          <TextField
            fullWidth
            select
            id="sexo"
            name="sexo"
            label="Sexo"
            value={sexo.toUpperCase()}
            onChange={onInputChange}
          >
            <MenuItem value="M" selected>
              Masculino
            </MenuItem>
            <MenuItem value="F">Femenino</MenuItem>
            <MenuItem value="D">Desconocido</MenuItem>
          </TextField>
        </div>

        {/* Nacionalidad */}
        <div style={{ marginBottom: "16px" }}>
          <TextField
            fullWidth
            select
            id="nacionalidad"
            name="nacionalidad"
            label="Nacionalidad"
            value={nacionalidad}
            onChange={onInputChange}
          >
            <MenuItem value="CL">Chileno/a</MenuItem>
            <MenuItem value="ARG">Argentino/a</MenuItem>
            <MenuItem value="PE">Peruano/a</MenuItem>
            <MenuItem value="BR">Brasileño/a</MenuItem>
            <MenuItem value="N">Sin nacionalidad</MenuItem>
          </TextField>
        </div>

        {/* Estado Civil */}
        <div style={{ marginBottom: "16px" }}>
          <TextField
            fullWidth
            select
            id="estado_cv"
            name="estado_cv"
            label="Estado Civil"
            value={estado_cv}
            onChange={onInputChange}
          >
            <MenuItem value={1}>Soltero/a</MenuItem>
            <MenuItem value={2}>Casado/a</MenuItem>
            <MenuItem value={3}>Divorciado/a</MenuItem>
            <MenuItem value={4}>Viudo/a</MenuItem>
          </TextField>
        </div>

        {/* Botón Registrar */}
        <Grid
          container
          mt={3}
          flexDirection={"row"}
          display={"flex"}
          spacing={2}
          justifyContent={"space-around"}
        >
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              height: "50px", // Ajusta la altura
              width: "200px", // Ajusta el ancho
              fontSize: "16px", // Ajusta el tamaño de la fuente
            }}
          >
            Actualizar
          </Button>
          <Button
            onClick={onResetForm}
            type="button"
            fullWidth
            variant="contained"
            color="inherit"
            sx={{
              height: "50px", // Ajusta la altura
              width: "200px", // Ajusta el ancho
              fontSize: "16px", // Ajusta el tamaño de la fuente
            }}
          >
            Limpiar
          </Button>
        </Grid>
      </form>
    </Grid>
  );
};
