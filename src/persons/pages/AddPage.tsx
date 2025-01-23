import { getDVRut } from "../utils";
import { Person } from "../../types/Person";
import { personSchema } from "../schemas";
import { setNewPerson } from "../helpers/setNewPerson";
import { useForm } from "../hooks";
import { useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";
import { TextField, MenuItem, Button, Grid } from "@mui/material";
const initialFormData = {
  nombre: "",
  apaterno: "",
  amaterno: "",
  fec_nac: "",
  rut: "",
  dv: "",
  sexo: "D",
  estado_cv: 1,
  activo: 0,
  id: "",
  nacionalidad: "N",
};
const initialRutBody = { body: "", dv: "0" };
export const AddPage = () => {
  const navigate = useNavigate();
  const [rut, setRut] = useState(initialRutBody);
  const handleChangeRut = (e: any) => {
    const { value } = e.target;
    const rutBody = value.replace(/\D/g, "");
    const dv = rutBody.length > 0 ? getDVRut(rutBody) : "";
    setRut({ body: rutBody, dv });
  };
  const {
    onInputChange,
    nombre,
    apaterno,
    amaterno,
    fec_nac,
    sexo,
    estado_cv,
    nacionalidad,
    activo,
    onResetForm,
  } = useForm(initialFormData);
  const handleCleanForm = () => {
    setRut(initialRutBody);
    onResetForm();
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData: Person = {
      nombre,
      apaterno,
      amaterno,
      fec_nac,
      rut: rut.body,
      dv: rut.dv,
      sexo,
      estado_cv: parseInt(estado_cv, 10),
      activo: parseInt(activo, 10),
      id: "",
      nacionalidad,
    };
    const result = personSchema.safeParse(formData);
    let errors = "";

    if (!result.success) {
      result.error.issues.forEach(({ message }) => {
        errors += `*${message}*<br>`; // Añadir salto de línea HTML
      });
      Swal.fire({
        title: "Error al registrar persona",
        html: `<span style="color: red;">${errors}</span>`, // Agregar color rojo con estilo en línea
        icon: "error",
        confirmButtonText: "Confirmar",
      });

      return;
    }
    if (result.success) {
      console.log("Datos de formulario válidos.");
      const response = await setNewPerson(formData);
      if (response.status === 409) {
        Swal.fire({
          title: "Rut ya existe!",
          html: `<h2>El rut registrado ya existe en el sistema<h2>`, // Agregar color rojo con estilo en línea
          icon: "warning",
          confirmButtonText: "Volver",
        });
        return;
      }
      onResetForm();
      Swal.fire({
        title: "Registro exitoso!",
        html: `<h4>La persona fue registrada exitosamente</h4><br><p>Serás redireccionado en breve</p>`,
        icon: "success",
        confirmButtonText: "Volver",
        didOpen: () => {
          setTimeout(() => {
            // Cerrar la alerta
            Swal.close();
            // Redirigir
            navigate("/");
          }, 3000); // 2 segundos antes de cerrar y redirigir
        },
      });
    }
  };

  return (
    <Grid>
      <Grid item sx={{ mb: 3 }}>
        <Link to={"/"}>
          <Button variant="contained">Volver</Button>
        </Link>
      </Grid>

      <form
        onSubmit={handleSubmit}
        style={{
          padding: "16px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          margin: "0px",
        }}
      >
        <h3 style={{ marginBottom: "16px" }}>Registrar Persona</h3>

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
              value={rut.body}
              onChange={handleChangeRut}
              inputProps={{ maxLength: 8, "aria-label": "Campo de RUT" }}
              sx={{ marginRight: "8px" }}
            />
            <span style={{ margin: "0 8px" }}>-</span>
            <TextField
              id="dv"
              name="dv"
              placeholder="DV"
              value={rut.dv}
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
          mt={2}
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
            Registrar
          </Button>
          <Button
            onClick={handleCleanForm}
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
export default AddPage;
