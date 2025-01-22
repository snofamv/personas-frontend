import { Link, useNavigate, useParams } from "react-router";
import { Person } from "../../types/Person";
import { useForm } from "../hooks";
import { useSearch } from "../hooks/useSearch";
import { useEffect, useState } from "react";
import { personSchema } from "../schemas";
import { updatePerson } from "../helpers/updatePerson";
import { getDVRut } from "../utils";
import Swal from "sweetalert2";

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
          }, 3000); // 2 segundos antes de cerrar y redirigir
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
        }, 3000); // 2 segundos antes de cerrar y redirigir
      },
    });
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
            {/* Campo RUT (más largo) */}
            <div className="flex-grow-1 me-2">
              <input
                type="text"
                className="form-control"
                id="rut"
                name="rut"
                placeholder="RUT sin dígito verificador"
                value={inputRut.body}
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
                value={inputRut.dv}
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
