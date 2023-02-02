import { FC, useState } from "react";
import { Button, Container, Spinner } from "react-bootstrap";

import { AddUserModal, DeleteUsersModal } from "../../components";
import CustomCard from "../../components/CustomCard/CustomCard";
import { IUser } from "../../models/IUser";
import { userApi } from "../../services/UserService";
interface IUsersProps {}
const Users: FC<IUsersProps> = () => {
  const { data: users, isLoading, error } = userApi.useFetchAllUsersQuery("");

  const [addUserModalVisible, setAddUserModalVisible] = useState(false);
  const [deleteUsersModalVisible, setDeleteUsersModalVisible] = useState(false);
  const [usersOnDelete, setUsersOnDelete] = useState<Set<IUser>>(new Set());

  const handleDeleteUsers = (deleteUser: IUser) => {
    setUsersOnDelete((prev) => {
      let newState = new Set(prev);
      if (newState.has(deleteUser)) {
        newState.delete(deleteUser);
      } else {
        newState.add(deleteUser);
      }
      return newState;
    });
  };

  const submitDeleteUsers = async () => {};
  console.log();

  if (isLoading) {
    return <Spinner className="position-absolute top-50 start-50" />;
  }

  return (
    <>
      <Container className="bg-light m-auto h-100  position-relative py-3">
        <div className="d-flex justify-content-between py-3">
          <div className="col-6 px-4">
            <h2>Список пользователей</h2>
          </div>
          <div className="col-6 text-center">
            <Button
              variant="outline-primary"
              className="m-2"
              onClick={() => setAddUserModalVisible(true)}
            >
              Добавить
            </Button>
            {!!usersOnDelete.size && (
              <Button
                onClick={() => setDeleteUsersModalVisible(true)}
                className="mx-2"
                variant="outline-danger"
              >
                Удалить
              </Button>
            )}
          </div>
        </div>

        <div className="d-flex justify-content-center flex-wrap gap-4">
          {users?.map((user) => {
            return (
              <CustomCard
                user={user}
                key={user._id}
                handleDeleteUser={handleDeleteUsers}
              />
            );
          })}
        </div>
        {users?.length == 0 && (
          <h2 className="text-center">Список пользователей пуст.</h2>
        )}
      </Container>

      {addUserModalVisible && (
        <AddUserModal
          onClose={() => {
            setAddUserModalVisible(false);
          }}
        />
      )}
      {deleteUsersModalVisible && (
        <DeleteUsersModal
          onClose={() => setDeleteUsersModalVisible(false)}
          usersOnDelete={Array.from(usersOnDelete)}
        />
      )}
    </>
  );
};

export default Users;
