import ReactDOM from "react-dom";
import css from "./Modal.module.css"; // Assume you have a CSS file for the modal window
import toast, { Toaster } from "react-hot-toast";
import { Typography } from "@mui/material";

const Modal = ({ isOpen, onClose, onConfirm }) => {
  // Render the toast container
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      {/* Check if the modal is open */}
      {isOpen &&
        ReactDOM.createPortal(
          <div className={css.modal}>
            <div className={css.modalContent}>
              <Typography variant="h5" component="span" color="maroon">
                Are you sure you want to delete this contact?
              </Typography>
              {/* Confirm button */}
              <div className={css.modalButton}>
                <button
                  onClick={() => {
                    onConfirm();
                    toast.success("Deleted successfully");
                  }}
                  className={css.modalButton} // Доданий клас для конкретного стилю кнопки
                >
                  <img
                    src="https://cdn.pixabay.com/animation/2023/04/19/19/48/19-48-46-868_512.gif"
                    alt="Yes gif"
                    className={css.gif}
                  />
                </button>
                {/* Cancel button */}
                <button
                  onClick={onClose}
                  className={css.modalButton} // Доданий клас для конкретного стилю кнопки
                >
                  <img
                    src="https://i.gifer.com/3klc.gif"
                    alt="No gif"
                    className={css.gif}
                  />
                </button>
              </div>
            </div>
          </div>,
          document.getElementById("modal-root")
        )}
    </>
  );
};

export default Modal;
