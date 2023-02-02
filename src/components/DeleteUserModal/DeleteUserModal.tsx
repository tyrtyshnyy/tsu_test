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
import { useNavigate } from "react-router-dom";
import { IUser } from "../../models/IUser";
import { useDeleteUserMutation } from "../../services/UserService";

interface IDeleteUserModalProps {
  onClose: () => void;
  user: IUser;
}
const DeleteUserModal: FC<IDeleteUserModalProps> = ({ onClose, user }) => {
  const { _id, firstName, lastName, patronymic } = user;
  const [deleteUser, { isLoading }] = useDeleteUserMutation();
  const closeModal = () => {
    if (onClose) onClose();
  };

  const navigate = useNavigate();

  interface IValuesForm {
    id: number;
  }
  const initialValues: IValuesForm = {
    id: _id || 0,
  };

  const handleDeleteUser = async (values: IValuesForm) => {
    try {
      await deleteUser(values.id);
      console.log(values.id);
      navigate("/");
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
  console.log(formik.errors);
  return (
    <Modal show={true} onHide={closeModal} backdrop="static" keyboard={false}>
      <>
        <Modal.Header closeButton>
          <Modal.Title>
            Вы действительно хотите удалить пользователя?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Row>
              <Form.Group as={Col} className="mb-3" controlId="firstName">
                <ListGroup>
                  <ListGroup.Item>
                    {firstName} {lastName} {patronymic}
                  </ListGroup.Item>
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

export default DeleteUserModal;
