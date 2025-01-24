import { Link } from "react-router";
import { Person } from "../../../types/Person";
import { capitalizeText } from "../../utils/capitalizeText";
interface Props {
  showExtraButtons: boolean;
  person: Person;
  onClick?: ({}: any) => void;
  onDelete?: (id: string) => void;
}
export const PersonCard = ({
  showExtraButtons,
  person,
  onClick,
  onDelete,
}: Props) => {
  const {
    nombre = "",
    apaterno = "",
    rut = "",
    dv = "",
    id: personId = "",
    activo,
  } = person;

  return (
    <div className="user" onClick={() => onClick && onClick({ rut, personId })}>
      <div className="image">
        <img
          src={`https://ui-avatars.com/api/?name=${nombre}+${apaterno}&background=random`}
          alt={`${nombre} ${apaterno}`}
          className="img-fluid rounded-circle"
        />
      </div>
      <div className="user__content">
        <div className="text">
          <span className="name">{`${capitalizeText(nombre)} ${capitalizeText(
            apaterno
          )}`}</span>
          <p className="username">RUT: {`${rut}-${dv}`}</p>
        </div>

        {/* Botones adicionales */}
        {showExtraButtons && (
          <div className="d-flex flex-column flex-sm-row align-items-center gap-2">
            <span
              style={{ color: !activo ? "red" : "green", fontWeight: "bold" }}
            >
              {activo ? "Activo" : "Inactivo"}
            </span>
            <Link className="btn btn-outline-primary" to={`/search/${rut}`}>
              Ver más
            </Link>
            <button
              className="btn btn-outline-danger"
              onClick={onDelete && (() => onDelete(personId))}
            >
              Eliminar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
