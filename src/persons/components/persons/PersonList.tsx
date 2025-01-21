import { Link } from "react-router";
import { Person } from "../../../types/Person";
import { PersonCard } from "./PersonCard";
interface Props {
  dataList: Person[];
}
export const PersonList = ({ dataList }: Props) => {
  return (
    <div className="card">
      <p className="title">Lista de personas</p>
      <div className="user__container">
        {dataList.map((person: Person) => (
          <PersonCard key={person.id} person={person} showMore/>
        ))}
      </div>
      <Link className="more" to="#">
        Ver mas
      </Link>
    </div>
  );
};
