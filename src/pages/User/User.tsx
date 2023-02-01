import { Button, Container, Figure, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import picPhoto from "../../assets/userpic.jpg";
import { userApi } from "../../services/UserService";

const User = () => {
  const { id } = useParams();
  const {
    data: user,
    isLoading,
    error,
    isSuccess,
  } = userApi.useFetchOneUserQuery(id!);

  if (!isSuccess) {
    return <Spinner className="position-absolute top-50 start-50" />;
  }
  const {
    _id,
    createDate,
    firstName,
    email,
    lastName,
    patronymic,
    avatar,
    about,
  } = user;
  if (error) {
    return <h2 className="text-center">Ошибка... Попробуйте позже</h2>;
  }
  return (
    <Container className="bg-light m-auto vh-100 position-relative">
      <div className="row py-4">
        <div className="col-sm-4 d-flex justify-content-center">
          <Figure>
            <Figure.Image
              width={300}
              height={180}
              alt="photo"
              src={avatar ? avatar : picPhoto}
            />
          </Figure>
        </div>
        <div className="col-sm-4 d-flex  flex-column">
        <div>
       <p className="fs-6 my-0 lh-1.1 opacity-50">
            ФИО:
        </p>
          <p className="fs-2 lh-1 ">
            {firstName} {lastName} {patronymic}{" "}
          </p>
       </div>
       <div>
       <p className="fs-6 my-0 lh-1.1 opacity-50">
            Email:
        </p>
          <p className="fs-4 lh-1">
            {email}
          </p>
       </div>
       <div>
       <p className="fs-6 my-0 lh-1.1 opacity-50">
            Дата регистрации:
        </p>
          <p className="fs-4 lh-1">
            {new Date(createDate).toLocaleDateString()}
          </p>
       </div>
       <div>
       <p className="fs-6 my-0 lh-1.1 opacity-50">
            Информация:
        </p>
          <p className="fs-4 lh-1">
            {about}
          </p>
       </div>
       
          
        </div>
        <div className="col-2">
          <Button>Редактировать</Button>
        </div>
      </div>
    </Container>
  );
};

export default User;
