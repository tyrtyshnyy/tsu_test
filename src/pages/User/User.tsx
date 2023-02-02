import { useState } from "react";
import { Button, Container, Image, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import picPhoto from "../../assets/userpic.jpg";
import { DeleteUserModal, EditUserModal } from "../../components";
import { userApi } from "../../services/UserService";
const User = () => {
  const { id } = useParams();
  const {
    data: user,
    isLoading,
    error,
    isSuccess,
  } = userApi.useFetchOneUserQuery(id!);

  const [editUserModalVisible, setEditUserModalVisible] = useState(false);
  const [deleteUserModalVisible, setDeleteUserModalVisible] = useState(false);
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
    <Container className="bg-light  w-100 vh-100 position-relative">
      <div className="row p-3">
        <div className="col-md-4 col-sm-12 ">
            <Image
              className="w-100 mb-2"
              alt="photo"
              src={avatar ? avatar : picPhoto}
            />
        </div>
        <div className="col-md-5 col-sm-12 text-center" style={{wordBreak: "break-all"}}>
          <div>
            <p className="fs-6 my-0 lh-1.1 opacity-50">ФИО:</p>
            <p className="fs-2 lh-1 ">
              {firstName} {lastName} {patronymic}{" "}
            </p>
          </div>
          <div>
            <p className="fs-6 my-0 lh-1.1 opacity-50">Email:</p>
            <p className="fs-4 lh-1">{email}</p>
          </div>
          <div>
            <p className="fs-6 my-0 lh-1.1 opacity-50">Дата регистрации:</p>
            <p className="fs-4 lh-1">
              {new Date(createDate).toLocaleDateString()}
            </p>
          </div>
          <div></div>
        </div>
        <div className="col-md-3 col-sm-12 p-0">
          <Button
            variant="outline-primary"
            className="m-2"
            onClick={() => setEditUserModalVisible(true)}
          >
            Редактировать
          </Button>
          <Button
            onClick={() => setDeleteUserModalVisible(true)}
            className="mx-2"
            variant="outline-danger"
          >
            Удалить
          </Button>
        </div>
      </div>
      <div className="row p-3">
        <p className="fs-6 my-0 lh-1.1 opacity-50">Информация:</p>
        <p className="fs-4 lh-1">{about ? about : "Отсутствует"}</p>
      </div>

      {deleteUserModalVisible && (
        <DeleteUserModal
          onClose={() => {
            setDeleteUserModalVisible(false);
          }}
          user={user}
        />
      )}

      {editUserModalVisible && (
        <EditUserModal
          onClose={() => setEditUserModalVisible(false)}
          user={user}
        />
      )}
    </Container>
  );
};

export default User;
