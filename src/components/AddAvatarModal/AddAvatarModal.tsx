import { FC, useState } from "react";
import { Button, Card, Modal, Spinner } from "react-bootstrap";
import { useFetchAllDogsQuery } from "../../services/DogService";

interface IAddAvatarModalProps {
  onClose: () => void;
  handleUrlAvatar: (url: string) => void;
}

const AddAvatarModal: FC<IAddAvatarModalProps> = ({
  onClose,
  handleUrlAvatar,
}) => {
  const closeModal = () => {
    if (onClose) onClose();
  };
  // Апишка отправляет 1 объект, невозможно отобрать больше, для этого сделана генерация,
  // иногда апи присылает файлы в виде mp4, сделана обработка на расширение
  const { data: dog, isLoading, error, refetch } = useFetchAllDogsQuery("");
  const [loadingPhoto, setLoadingPhoto] = useState(false);
  const picPhoto = "https://mr-green.ru/images/user/she-1014x1024.jpg";
  const format = ["jpg", "JPG", "jpeg", "JPEG", "png", "PNG"];
  const photo =
    dog && (format.includes(dog.url.slice(-3)) ? dog.url : picPhoto);

  const handleClickOnAvatar = () => {
    if (photo) {
      handleUrlAvatar(photo);
      closeModal();
    }
  };

  const generatePhoto = () => {
    refetch();
    setLoadingPhoto(false);
  };
  return (
    <Modal
      show={true}
      size="sm"
      onHide={closeModal}
      backdrop="static"
      keyboard={false}
    >
      <>
        <Modal.Header closeButton>
          <Modal.Title>Нажмите, чтобы выбрать картинку</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <p>Ошибка, попробуйте позже..</p>}
          <Card
            style={{
              width: "7rem",
              height: "7rem",
              cursor: "pointer",
              position: "relative",
            }}
            className="mb-3"
            onClick={handleClickOnAvatar}
          >
            <Card.Img
              className={`${!loadingPhoto ? "d-none" : ""} w-100 h-100 `}
              variant="top"
              src={photo}
              onLoad={() => setLoadingPhoto(true)}
            />

            {!loadingPhoto && <Spinner animation="grow" size="sm" />}
          </Card>
          <Button onClick={generatePhoto}>Сгенерировать</Button>
        </Modal.Body>
      </>
    </Modal>
  );
};

export default AddAvatarModal;
