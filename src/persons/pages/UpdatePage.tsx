import { Link, useNavigate, useParams } from "react-router";
import { Nacionalidad, Person, Sexo } from "../../types/Person";
import { useForm } from "../hooks";
import { useSearch } from "../hooks/useSearch";
import { useEffect } from "react";
import { updatePerson } from "../helpers/updatePerson";

export const UpdatePage = () => {
  // HOOKS & VARIABLES
  const navigate = useNavigate();
  const { rut: queryParam = "" } = useParams();
  const { error, loading, person } = useSearch(queryParam);

  const {
    setFormValues,
    onInputChange,
    nombre,
    apaterno,
    amaterno,
    rut = queryParam,
    dv,
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
    sexo: Sexo.D,
    estado_cv: 1,
    activo: 0,
    id: "",
    nacionalidad: Nacionalidad.NA,
  });

  useEffect(() => {
    if (person && person.length > 0) {
      setFormValues(person[0]);
    }
  }, [person, queryParam]);

  const handleUpdateForm = async (event: React.FormEvent) => {
    event.preventDefault();
    const newPerson: Person = {
      nombre,
      apaterno,
      amaterno,
      fec_nac,
      rut,
      dv,
      sexo,
      estado_cv: parseInt(estado_cv, 10),
      activo: parseInt(activo, 10),
      nacionalidad,
      id,
    };
    console.log(newPerson);
    const response = await updatePerson(newPerson);
    console.log("REPUESTA:", response);
    if (response.status === 404) {
      console.warn("Error, recurso no encontrado.");
      return;
    }
    if (response.status === 200) {
      alert("Persona actualizada correctamente");
      navigate(`/`);
    }
  };

  return (
    <>
      {loading && <h5 className="text-center">Cargando</h5>}
      {error && <h5 className="text-center">Error</h5>}
      <form
        onSubmit={handleUpdateForm}
        className="p-4 border rounded shadow container mt-3"
      >
        <legend>
          <div className="d-flex gap-3 mt-2 justify-content-between align-items-center">
            <h1>
              {rut}-{dv} || {`${nombre} ${apaterno}`}
            </h1>
            <Link to={"/"} className="btn btn-primary">
              Volver
            </Link>
          </div>
          <hr />
        </legend>
        {/* RUT */}
        <div className="mb-3">
          <label htmlFor="rut" className="form-label">
            RUT
          </label>
          <div className="input-group">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="rut"
                name="rut"
                placeholder="RUT sin dígito verificador"
                value={rut}
                onChange={onInputChange}
                required
              />
              <span className="input-group-text">-</span>
              <input
                type="text"
                className="form-control"
                id="dv"
                name="dv"
                placeholder="DV"
                maxLength={1}
                value={dv}
                onChange={onInputChange}
                required
              />
              <select
                className="form-select ms-5"
                id="activo"
                name="activo"
                value={activo}
                onChange={onInputChange}
                required
              >
                <option value="">Estado...</option>
                <option value={1}>Habilitado</option>
                <option value={0}>Deshabilitado</option>
              </select>
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
            required
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
            required
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
            required
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
            required
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
            required
          >
            <option value="">Seleccione...</option>
            <option value={Sexo.M}>Masculino</option>
            <option value={Sexo.F}>Femenino</option>
            <option value={Sexo.NB}>No binario</option>
            <option value={Sexo.D}>Desconocido</option>
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
            required
          >
            <option value="">Seleccione...</option>
            <option value={Nacionalidad.CL}>Chileno/a</option>
            <option value={Nacionalidad.NA}>Sin nacionalidad</option>
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
            required
          >
            <option value="">Seleccione...</option>
            <option value={1}>Soltero/a</option>
            <option value={2}>Casado/a</option>
            <option value={3}>Divorciado/a</option>
            <option value={4}>Viudo/a</option>
          </select>
        </div>

        {/* Botón Registrar */}
        <div className="d-flex row gap-2">
          <button type="submit" className="btn btn-success w-100">
            Actualizar
          </button>
        </div>
      </form>
    </>
  );
};
