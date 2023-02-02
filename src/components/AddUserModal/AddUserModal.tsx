import axios from "axios";
import { useFormik } from "formik";
import { FC, useState } from "react";
import { Button, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import * as yup from "yup";
import { useAddUserMutation } from "../../services/UserService";
import AddAvatarModal from "../AddAvatarModal/AddAvatarModal";

interface IAddUserModalProps {
  onClose: () => void;
}
const AddUserModal: FC<IAddUserModalProps> = ({ onClose }) => {
  const [addUser, { isLoading }] = useAddUserMutation();
  const [addAvarModalVisible, setAddAvarModalVisible] = useState(false);
  const [urlAvatar, setUrlAvatar] = useState("");
  const closeModal = () => {
    if (onClose) onClose();
  };
  const validationSchema = yup.object().shape({
    firstName: yup.string().required("Введите имя"),
    lastName: yup.string().required("Введите фамилию"),
    email: yup
      .string()
      .email("Почта некорректна")
      .test("error", "Почта уже используется", function (email) {
        return new Promise((resolve, reject) => {
          axios
            .post<string>(
              `https://jovial-snickerdoodle-b85d1f.netlify.app/.netlify/functions/index/users/email`,
              {
                email: email,
              }
            )
            .then((res) => {
              if (res.data === "Email already been taken") {
                resolve(false);
              }
              resolve(true);
            });
        });
      })
      .required("Почта обязательна"),
    patronymic: yup.string(),
  });

  interface IValuesForm {
    createDate: string;
    avatar?: string;
    firstName: string;
    lastName: string;
    patronymic?: string;
    email: string;
    about?: string;
  }
  const initialValues: IValuesForm = {
    firstName: "",
    lastName: "",
    createDate: new Date().toISOString(),
    email: "",
    avatar: "",
    patronymic: "",
    about: "",
  };

  const handleAddUser = async (values: IValuesForm) => {
    try {
      await addUser({
        firstName: values.firstName,
        lastName: values.lastName,
        patronymic: values.patronymic,
        createDate: values.createDate,
        email: values.email,
        avatar: urlAvatar,
        about: "",
      });
      setUrlAvatar("");
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };
  console.log(urlAvatar);

  const handleUrlAvatar = (url: string) => {
    setUrlAvatar(url);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    validateOnChange: false,
    onSubmit: (values) => handleAddUser(values),
  });
  return (
    <Modal show={true} onHide={closeModal} backdrop="static" keyboard={false}>
      <>
        <Modal.Header closeButton>
          <Modal.Title>Добавить пользователя</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Row>
              <Form.Group as={Col} className="mb-3" controlId="firstName">
                <Form.Label>Имя</Form.Label>
                <Form.Control
                  name="firstName"
                  type="text"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.firstName}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} className="mb-3" controlId="lastName">
                <Form.Label>Фамилия</Form.Label>
                <Form.Control
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  type="text"
                  isInvalid={!!formik.errors.lastName}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.lastName}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} className="mb-3" controlId="patronymic">
                <Form.Label>Отчество</Form.Label>
                <Form.Control
                  value={formik.values.patronymic}
                  onChange={formik.handleChange}
                  type="text"
                  isInvalid={!!formik.errors.patronymic}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.patronymic}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} className="mb-3" controlId="patronymic">
                <Form.Label>Фотография</Form.Label>
                <Button
                  onClick={() => setAddAvarModalVisible(true)}
                  variant="outline-primary"
                  disabled={!!urlAvatar}
                >
                  {!!urlAvatar ? "Аватар выбран" : "Выбрать аватар"}
                </Button>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.patronymic}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={formik.values.email}
                onChange={formik.handleChange}
                type="email"
                isInvalid={!!formik.errors.email}
              />

              <Form.Control.Feedback type="invalid">
                {formik.errors.email}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Закрыть
          </Button>
          <Button
            variant="primary"
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
            Добавить
          </Button>
        </Modal.Footer>
      </>

      {addAvarModalVisible && (
        <AddAvatarModal
          onClose={() => {
            setAddAvarModalVisible(false);
          }}
          handleUrlAvatar={handleUrlAvatar}
        />
      )}
    </Modal>
  );
};

export default AddUserModal;
