import { Link } from "react-router";
import { Person } from "../../../types/Person";
interface Props {
  showExtraButtons: boolean;
  person: Person;
  onClick?: () => void;
  onDelete: (id: string) => void;
}
export const PersonCard = ({
  showExtraButtons,
  person,
  onClick,
  onDelete,
}: Props) => {
  const { nombre = "", apaterno = "", rut = "", dv = "", id = "" } = person;

  return (
    <>
      <div className="user" onClick={onClick && onClick}>
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
          {showExtraButtons ? (
            <Link
              className={`follow text-decoration-none ${
                showExtraButtons ? "" : "d-none"
              }`}
              to={`/search/${rut}`}
            >
              Ver mas
            </Link>
          ) : null}
          {showExtraButtons ? (
            <button
              className={`delete text-decoration-none${
                showExtraButtons ? "" : "d-none"
              }`}
              onClick={() => onDelete(id)}
            >
              Eliminar
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
};
