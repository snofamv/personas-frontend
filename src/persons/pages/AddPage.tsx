import { useEffect, useState } from "react";
import { Person } from "../../types/Person";
import { setNewPerson } from "../helpers/setNewPerson";
import { useForm } from "../hooks";
import { personSchema } from "../schemas";
import { getDVRut } from "../utils";
const initialFormData = {
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
};
export const AddPage = () => {
  const [rut, setRut] = useState({ body: "", dv: "0" });
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
    if (!result.success) {
      const newErrors = result.error.issues.map(
        (issue) => `*El campo ${issue.path} - ${issue.message}.*\n`
      );
      alert(newErrors);
      return;
    }
    if (result.success) {
      console.log("Datos de formulario válidos.");
      const response = await setNewPerson(formData);
      if (response.status === 200) {
        onResetForm();
        alert("Persona agregada correctamente.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
      <h3 className="mb-4">Registrar Persona</h3>
      {/* RUT */}
      <div className="mb-3">
        <label htmlFor="rut" className="form-label">
          RUT
        </label>

        <div className="input-group">
          {/* Campo RUT (más largo) */}
          <div className="flex-grow-1 me-2">
            <input
              type="text"
              className="form-control"
              id="rut"
              name="rut"
              placeholder="RUT sin dígito verificador"
              value={rut.body}
              onChange={handleChangeRut}
              maxLength={8} // Restringir la longitud máxima
              aria-label="Campo de RUT"
            />
          </div>
          <div className="d-flex">
            <span className="input-group-text">-</span>
            <input
              type="text"
              className="form-control w-auto"
              id="dv"
              name="dv"
              placeholder="DV"
              maxLength={1}
              value={rut.dv}
              onChange={handleChangeRut}
              disabled
              aria-label="Campo de DV"
            />
          </div>
        </div>
      </div>

      {/* Nombre */}
      <div className="mb-3">
        <label htmlFor="nombre" className="form-label">
          Nombre
        </label>
        <input
          type="text"
          className="form-control"
          id="nombre"
          name="nombre"
          value={nombre}
          onChange={onInputChange}
        />
      </div>

      {/* Apellido Paterno */}
      <div className="mb-3">
        <label htmlFor="apaterno" className="form-label">
          Apellido Paterno
        </label>
        <input
          type="text"
          className="form-control"
          id="apaterno"
          name="apaterno"
          value={apaterno}
          onChange={onInputChange}
        />
      </div>

      {/* Apellido Materno */}
      <div className="mb-3">
        <label htmlFor="amaterno" className="form-label">
          Apellido Materno
        </label>
        <input
          type="text"
          className="form-control"
          id="amaterno"
          name="amaterno"
          value={amaterno}
          onChange={onInputChange}
        />
      </div>

      {/* Fecha de Nacimiento */}
      <div className="mb-3">
        <label htmlFor="fec_nac" className="form-label">
          Fecha de Nacimiento
        </label>
        <input
          type="date"
          className="form-control"
          id="fec_nac"
          name="fec_nac"
          value={fec_nac}
          onChange={onInputChange}
        />
      </div>

      {/* Sexo */}
      <div className="mb-3">
        <label htmlFor="sexo" className="form-label">
          Sexo
        </label>
        <select
          className="form-select"
          id="sexo"
          name="sexo"
          value={sexo}
          onChange={onInputChange}
        >
          <option value="">Seleccione...</option>
          <option value={"M"}>Masculino</option>
          <option value={"F"}>Femenino</option>
          <option value={"N"}>No binario</option>
          <option value={"D"}>Desconocido</option>
        </select>
      </div>
      {/* Nacionalidad */}
      <div className="mb-3">
        <label htmlFor="nacionalidad" className="form-label">
          Nacionalidad
        </label>
        <select
          className="form-select"
          id="nacionalidad"
          name="nacionalidad"
          value={nacionalidad}
          onChange={onInputChange}
        >
          <option value={""}>Seleccione...</option>
          <option value={"CL"}>Chileno/a</option>
          <option value={"ARG"}>Argentino/a</option>
          <option value={"PE"}>Peruano/a</option>
          <option value={"BR"}>Brasileño/a</option>
          <option value={"NA"}>Sin nacionalidad</option>
        </select>
      </div>
      {/* Estado Civil */}
      <div className="mb-3">
        <label htmlFor="estado_cv" className="form-label">
          Estado Civil
        </label>
        <select
          className="form-select"
          id="estado_cv"
          name="estado_cv"
          value={estado_cv}
          onChange={onInputChange}
        >
          <option value={""}>Seleccione...</option>
          <option value={1}>Soltero/a</option>
          <option value={2}>Casado/a</option>
          <option value={3}>Divorciado/a</option>
          <option value={4}>Viudo/a</option>
        </select>
      </div>

      {/* Botón Registrar */}
      <button type="submit" className="btn btn-primary w-100">
        Registrar
      </button>
    </form>
  );
};
export default AddPage;
