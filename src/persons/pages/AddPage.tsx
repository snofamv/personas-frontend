import { EstadoCV, Nacionalidad, Person, Sexo } from "../../types/Person";
import { setNewPerson } from "../helpers/setNewPerson";
import { useForm } from "../hooks";
const initialFormData: Person = {
  nombre: "",
  apaterno: "",
  amaterno: "",
  fec_nac: "",
  rut: "",
  dv: "",
  sexo: Sexo.D,
  estado_cv: EstadoCV.SOLTERO,
  activo: 0,
  id: "",
  nacionalidad: Nacionalidad.NA,
} as Person;
export const AddPage = () => {
  const {
    onInputChange,
    nombre,
    apaterno,
    amaterno,
    fec_nac,
    rut,
    dv,
    sexo,
    estado_cv,
    nacionalidad,
    onResetForm,
  } = useForm(initialFormData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newPerson: Person = {
      nombre,
      apaterno,
      amaterno,
      fec_nac,
      rut,
      dv,
      sexo,
      estado_cv,
      activo: 0,
      id: "",
      nacionalidad,
    };
    const response = await setNewPerson(newPerson);
    if (response.status === 409) {
      alert("Ya existe rut, modfique los datos.");
    }
    if (response.status === 200) {
      onResetForm();
      alert("Persona agregada correctamente");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
      <h3 className="mb-4">Registrar Persona</h3>

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

      {/* RUT */}
      <div className="mb-3">
        <label htmlFor="rut" className="form-label">
          RUT
        </label>
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
        </div>
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
          <option value={""}>Seleccione...</option>
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
          <option value={""}>Seleccione...</option>
          <option value={EstadoCV.SOLTERO}>Soltero/a</option>
          <option value={EstadoCV.CASADO}>Casado/a</option>
          <option value={EstadoCV.DIVORCIADO}>Divorciado/a</option>
          <option value={EstadoCV.VIUDO}>Viudo/a</option>
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
