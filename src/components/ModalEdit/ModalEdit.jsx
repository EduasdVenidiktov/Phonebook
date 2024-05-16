import ReactDOM from "react-dom";
import css from "./ModalEdit.module.css"; // Assume you have a CSS file for the modal window
import toast, { Toaster } from "react-hot-toast";

const ModalEdit = ({
  isOpen,
  onClose,
  onConfirm,
  cancelButtonText,
  confirmButtonText,
  editedName,
  setEditedName,
  editedNumber,
  setEditedNumber,
}) => {
  // Render the toast container
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      {/* Check if the modal is open */}
      {isOpen &&
        ReactDOM.createPortal(
          <div className={css.modal}>
            <div className={css.modalContent}>
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
              <input
                type="text"
                value={editedNumber}
                onChange={(e) => setEditedNumber(e.target.value)}
              />
              {/* Confirm button */}
              <button
                onClick={() => {
                  onConfirm();
                  toast.success("Saved successfully");
                }}
              >
                {confirmButtonText}
              </button>
              {/* Cancel button */}
              <button onClick={onClose}>{cancelButtonText}</button>
            </div>
          </div>,
          document.getElementById("modal-root")
        )}
    </>
  );
};

export default ModalEdit;
