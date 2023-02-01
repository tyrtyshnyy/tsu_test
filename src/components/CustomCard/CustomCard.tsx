import { FC, useState } from "react";
import { Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import picPhoto from "../../assets/userpic.jpg";
import { IUser } from "../../models/IUser";

interface ICustomCardProps {
  user: IUser;
  handleDeleteUser: (id: number) => void;
}
const CustomCard: FC<ICustomCardProps> = ({ user, handleDeleteUser }) => {
  const { _id, createDate, firstName, email, lastName, patronymic, avatar } =
    user;
  const [selectUser, setSelectUser] = useState(false);
  const handleClickUser = (id: number) => {
    handleDeleteUser(id);
    setSelectUser((prev) => !prev);
  };
  return (
    <NavLink to={`/${_id}`} style={{ textDecoration: 'none' }}>
    <Card
      style={{ width: "18rem" }}
      role="button"
      onClick={() => handleClickUser(_id || 0)}
      className={selectUser ? "border border-danger" : ""}
    >
      <Card.Img variant="top" src={avatar ? avatar : picPhoto} />
      <Card.Body>
        <Card.Title>
          {firstName} {lastName} {patronymic}
        </Card.Title>
        <Card.Text>
          <span className="opacity-75 ">email: </span>
          {email}
        </Card.Text>
      </Card.Body>
    </Card>
    </NavLink>
  );
};

export default CustomCard;
