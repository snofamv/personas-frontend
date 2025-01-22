import { Link } from "react-router";
import { Person } from "../../../types/Person";
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
    <>
      <div
        className="user"
        onClick={() => onClick && onClick({ rut, personId })}
      >
        <div className="image">
          <img
            src={`https://ui-avatars.com/api/?name=${nombre}+${apaterno}&background=random`}
            alt={`${nombre} ${apaterno}`}
            className="img-fluid rounded-circle"
          />
        </div>
        <div className="user__content">
          <div className="text">
            <span className="name">{`${nombre} ${apaterno}`}</span>
            <p className="username">RUT: {`${rut}-${dv}`}</p>
          </div>

          {/* Indicador de estado */}
          <div className="status-indicator">
            <span className={`status-badge ${activo ? "active" : "inactive"}`}>
              {activo ? "Activo" : "Inactivo"}
            </span>
          </div>

          {/* Botones adicionales */}
          {showExtraButtons && (
            <>
              <Link
                className="follow text-decoration-none"
                to={`/search/${rut}`}
              >
                Ver más
              </Link>
              <button
                className="delete text-decoration-none"
                onClick={onDelete && (() => onDelete(personId))}
              >
                Eliminar
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};
