import "./ModalWithForm.css";
import close from "../../images/Close.svg";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  handleModalClose,
  onSubmit,
}) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content">
        <p className="modal__title">{title}</p>
        <button
          type="button"
          className="modal__close"
          onClick={handleModalClose}
        >
          <img src={close} alt="close button" />
        </button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <div className="modal__buttons">
            <button className="modal__submit" type="submit">
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
