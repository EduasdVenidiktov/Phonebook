import ReactDOM from "react-dom";
import css from "./ModalEdit.module.css";
import { TextField } from "@mui/material";
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
  contactId,
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
              <TextField
                label="New name"
                variant="filled"
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
              <button
                onClick={() => {
                  onConfirm(contactId);
                  toast.success("Saved successfully");
                }}
              >
                {confirmButtonText}
              </button>
              <button onClick={onClose}>{cancelButtonText}</button>
              <TextField
                label="New number"
                variant="filled"
                type="search"
                value={editedNumber}
                onChange={(e) => setEditedNumber(e.target.value)}
              />
            </div>
          </div>,
          document.getElementById("modal-root")
        )}
    </>
  );
};

export default ModalEdit;
