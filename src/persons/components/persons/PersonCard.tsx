import { Link } from "react-router";
import { Person } from "../../../types/Person";
interface Props {
  showMore: boolean;
  person: Person;
  onClick?: () => void;
}
export const PersonCard = ({ showMore, person, onClick }: Props) => {
  const { nombre = "", apaterno = "", rut = "", dv = "" } = person;

  return (
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
        {showMore ? (
          <Link
            className={`follow text-decoration-none ${
              showMore ? "" : "d-none"
            }`}
            to={`/search/${rut}`}
          >
            Ver mas
          </Link>
        ) : null}
      </div>
    </div>
  );
};
