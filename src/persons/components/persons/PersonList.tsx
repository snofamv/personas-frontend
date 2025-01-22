import { Link } from "react-router";
import { PersonCard } from "./PersonCard";
import { Person } from "../../../types/Person";

interface Props {
  dataList: Person[];
  onDelete: (id: string) => void;
  onClick: (id: string) => void;
}

export const PersonList = ({ dataList, onDelete }: Props) => {
  return (
    <div className="card">
      <p className="title">Lista de personas</p>
      <div className="user__container">
        {dataList.map((person) => (
          <PersonCard
            key={person.id}
            person={person}
            showExtraButtons
            onDelete={onDelete}
          />
        ))}
      </div>
      <Link className="more" to="#">
        Ver más
      </Link>
    </div>
  );
};
