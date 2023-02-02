import { useFormik } from "formik";
import { FC } from "react";
import {
  Button,
  Col,
  Form,
  ListGroup,
  Modal,
  Row,
  Spinner
} from "react-bootstrap";
import { IUser } from "../../models/IUser";
import { useDeleteUsersMutation } from "../../services/UserService";

interface IDeleteUsersModalProps {
  onClose: () => void;
  usersOnDelete: IUser[];
}
const DeleteUsersModal: FC<IDeleteUsersModalProps> = ({
  onClose,
  usersOnDelete,
}) => {
  const [deleteUsers, { isLoading }] = useDeleteUsersMutation();
  const closeModal = () => {
    if (onClose) onClose();
  };
  console.log(usersOnDelete);

  interface IValuesForm {
    id: number;
  }
  const initialValues: IValuesForm = {
    id: 0,
  };
  const usersId = usersOnDelete?.map((user) => user._id) as number[]
  console.log(usersId);

  const handleDeleteUser = async (values: IValuesForm) => {
    try {
      await deleteUsers({
        ids: usersId,
      });
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues,
    validateOnChange: false,
    onSubmit: (values) => handleDeleteUser(values),
  });
  return (
    <Modal show={true} onHide={closeModal} backdrop="static" keyboard={false}>
      <>
        <Modal.Header closeButton>
          <Modal.Title>
            Вы действительно хотите удалить пользователей?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Row>
              <Form.Group as={Col} className="mb-3" controlId="firstName">
                <ListGroup>
                  {usersOnDelete.map((user) => (
                    <ListGroup.Item key={user._id}>
                      {user.firstName} {user.lastName} {user.patronymic}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Отменить
          </Button>
          <Button
            variant="danger"
            type="submit"
            // @ts-ignore
            onClick={formik.handleSubmit}
            disabled={isLoading}
          >
            {isLoading && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="mx-1"
              />
            )}
            Удалить
          </Button>
        </Modal.Footer>
      </>
    </Modal>
  );
};

export default DeleteUsersModal;
