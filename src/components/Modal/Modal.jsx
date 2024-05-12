import ReactDOM from "react-dom";
import css from "./Modal.module.css"; // Assume you have a CSS file for the modal window
import toast, { Toaster } from "react-hot-toast";

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
              <p>Ви впевнені, що хочете видалити контакт?</p>
              {/* Confirm button */}
              <button
                onClick={() => {
                  onConfirm();
                  toast.success("Deleted successfully");
                }}
              >
                <img
                  src="https://i.gifer.com/7efs.gif"
                  alt="Yes gif"
                  className={css.gif}
                />
              </button>
              {/* Cancel button */}
              <button onClick={onClose}>
                <img
                  src="https://i.gifer.com/3klc.gif"
                  alt="No gif"
                  className={css.gif}
                />
              </button>
            </div>
          </div>,
          document.getElementById("modal-root")
        )}
    </>
  );
};

export default Modal;
//=========================================================
// // import React from "react"; // Не потрібно, оскільки ми використовуємо функціональні компоненти
// import ReactDOM from "react-dom";
// import css from "./Modal.module.css"; // Припустимо, що у вас є файл стилів для модального вікна
// // import { useDispatch } from "react-redux";
// // import toast from "react-hot-toast";
// // import { deleteContact } from "../../redux/contacts/operations";

// const Modal = ({ isOpen, onClose, onConfirm }) => {
//   //   const dispatch = useDispatch();

//   //   const handleConfirm = () => {
//   //     // Выполняем операцию удаления контакта
//   //     dispatch(deleteContact(contactId))
//   //       .then(() => {
//   //         // Если удаление прошло успешно, выводим сообщение об успешной операции
//   //         toast.success("Контакт успешно удален");
//   //         // Закрываем модальное окно
//   //         onClose();
//   //       })
//   //       .catch(() => {
//   //         // Если произошла ошибка при удалении, выводим сообщение об ошибке
//   //         toast.error("Ошибка при удалении контакта");
//   //         // Закрываем модальное окно
//   //         onClose();
//   //       });
//   //   };

//   if (!isOpen) return null;

//   return ReactDOM.createPortal(
//     <div className={css.modal}>
//       <div className={css.modalContent}>
//         <p>Ви впевнені, що хочете видалити контакт?</p>
//         <button onClick={onConfirm}>
//           <img
//             src="https://i.gifer.com/7efs.gif"
//             alt="Yes gif" //i.gifer.com/5sHb.gif //
//             className={css.gif}
//           />
//         </button>
//         <button onClick={onClose}>
//           <img
//             src="https://i.gifer.com/3klc.gif "
//             alt="No gif"
//             className={css.gif}
//           />
//         </button>
//       </div>
//     </div>,
//     document.getElementById("modal-root") // Відображення модального вікна в елементі з id = "modal-root"
//   );
// };

// export default Modal;
