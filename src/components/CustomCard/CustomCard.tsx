import { FC, useState } from "react";
import { Card, CloseButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import picPhoto from "../../assets/userpic.jpg";
import { IUser } from "../../models/IUser";

interface ICustomCardProps {
  user: IUser;
  handleDeleteUser: (user: IUser) => void;
}
const CustomCard: FC<ICustomCardProps> = ({ user, handleDeleteUser }) => {
  const { _id, createDate, firstName, email, lastName, patronymic, avatar } =
    user;
  const [selectUser, setSelectUser] = useState(false);
  const handleClickUser = (user: IUser) => {
    handleDeleteUser(user);
    setSelectUser((prev) => !prev);
  };

  const handleLengthString = (str: string) => {
    if (str.length > 25) {
      return str.substring(0, 25) + "...";
    }
    return str;
  };
  return (
    <>
      <Card
        style={{ width: "18rem", height: "26rem", zIndex: 10 }}
        role="button"
        onClick={() => handleClickUser(user)}
        className={`${
          selectUser ? "border border-danger" : ""
        } position-relative overflow-hidden`}
      >
        <CloseButton
          style={{
            position: "absolute",
            top: "0.2rem",
            right: "0.2rem",
            zIndex: 100,
          }}
        />
        <Link to={`/${_id}`} style={{ textDecoration: "none" }}>
          <div style={{ width: "18rem", height: "20rem" }}>
            <Card.Img
              className="h-100 w-100 rounded"
              variant="top"
              src={avatar ? avatar : picPhoto}
            />
          </div>

          <Card.Body>
            <Card.Title className="m-0">
              {firstName} {lastName} {patronymic}
            </Card.Title>
            <Card.Text>
              <span className="opacity-75 ">email: </span>
              {handleLengthString(email)}
            </Card.Text>
          </Card.Body>
        </Link>
      </Card>
    </>
  );
};

export default CustomCard;
