import { FC, useState } from "react";
import { Button, Container, Spinner } from "react-bootstrap";

import { AddUserModal } from "../../components";
import CustomCard from "../../components/CustomCard/CustomCard";
import { userApi } from "../../services/UserService";
interface IUsersProps {}

const Users: FC<IUsersProps> = () => {
  const { data: users, isLoading, error } = userApi.useFetchAllUsersQuery("");
  const [addUserModalVisible, setAddUserModalVisible] = useState(false);
  const [usersOnDetele, setUsersOnDelete] = useState<number[]>([]);

  if(isLoading) {
    return <Spinner className="position-absolute top-50 start-50"/>
}
  return (
    <Container className="bg-light m-auto vh-100 position-relative">
      <div className="d-flex justify-content-between py-3">
        <div className="col-4">
          <h2>Список пользователей</h2>
        </div>
        <div className="col-4 ">
          <Button
            variant="outline-primary"
            className="m-2"
            onClick={() => setAddUserModalVisible(true)}
          >
            Создать
          </Button>
          <Button className="mx-2" variant="outline-danger">
            Удалить
          </Button>
        </div>
      </div>

      <div className="d-flex justify-content-center flex-wrap gap-4">
        {users?.map((user) => {
          return (
            <CustomCard
              user={user}
              key={user._id}
              handleDeleteUser={(id) =>
                setUsersOnDelete((prev) => [...prev, id])
              }
            />
          );
        })}
      </div>
      {addUserModalVisible && (
        <AddUserModal
          onClose={() => {
            setAddUserModalVisible(false);
          }}
          onSave={() => {}}
        />
      )}
    </Container>
  );
};

export default Users;
