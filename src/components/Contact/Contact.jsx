// import css from "./Contact.module.css";
// import personIcon from "../../assets/person.svg";
// import phoneIcon from "../../assets/phone.svg";

// import { deleteContact } from "../../redux/contacts/operations.js";

// import { useDispatch } from "react-redux";
// import Modal from "../Modal/Modal.jsx";
// import { useState } from "react";

// export default function Contact({ id, name, number }) {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const dispatch = useDispatch();
//   const handleDelete = () =>
//     dispatch(deleteContact(id))
//       .then(() => {
//         setIsModalOpen(false); // Закриття модального вікна після успішного видалення
//       })
//       .catch((error) => {
//         console.error("Помилка при видаленні контакту:", error);
//         // Додайте необхідну обробку помилок тут
//       });

//   return (
//     <div className={css.contactContainer}>
//       <div>
//         <div className={css.infoBlock}>
//           <img className={css.icon} src={personIcon} alt="Icon people" />
//           <h3>{name}</h3>
//         </div>

//         <div className={css.infoBlock}>
//           <img className={css.icon} src={phoneIcon} alt="Icon phone" />
//           <a className={css.infoLink} href={`tel:${number}`}>
//             {number}
//           </a>
//         </div>
//       </div>
//       <button onClick={() => setIsModalOpen(true)}>Delete</button>
//       <Modal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onConfirm={handleDelete}
//       />
//     </div>
//   );
// }
import css from "./Contact.module.css";
import personIcon from "../../assets/person.svg";
import phoneIcon from "../../assets/phone.svg";

import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import {
  deleteContact,
  updateContact,
} from "../../redux/contacts/operations.js"; // Добавляем импорт операции обновления контакта
import ModalEdit from "../ModalEdit/ModalEdit.jsx"; // Импортируем компонент ModalEdit

export default function Contact({ id, name, number }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedNumber, setEditedNumber] = useState(number);

  const dispatch = useDispatch();

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };
  useEffect(() => {
    setEditedName(name);
    setEditedNumber(number);
  }, [name, number]);

  const handleSaveClick = () => {
    const updatedContact = {
      id: id,
      name: editedName,
      number: editedNumber,
    };
    dispatch(updateContact(updatedContact)); // Вызываем операцию обновления контакта
    setIsEditModalOpen(false);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () =>
    dispatch(deleteContact(id))
      .then(() => {
        setIsDeleteModalOpen(false);
      })
      .catch((error) => {
        console.error("Error deleting contact:", error);
        // Обработка ошибки удаления контакта
      });

  return (
    <div className={css.contactContainer}>
      <div>
        <div className={css.infoBlock}>
          <img className={css.icon} src={personIcon} alt="Icon people" />
          <h3>{name}</h3>
        </div>

        <div className={css.infoBlock}>
          <img className={css.icon} src={phoneIcon} alt="Icon phone" />
          <a className={css.infoLink} href={`tel:${number}`}>
            {number}
          </a>
        </div>
      </div>
      <button onClick={handleEditClick}>Edit</button>

      <button onClick={handleDeleteClick}>Delete</button>

      <ModalEdit
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onConfirm={handleSaveClick}
        cancelButtonText="Cancel"
        confirmButtonText="Save"
        editedName={editedName}
        setEditedName={setEditedName}
        editedNumber={editedNumber}
        setEditedNumber={setEditedNumber}
      />

      {/* Вместо Modal используем ModalEdit */}
      <ModalEdit
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        cancelButtonText="Cancel"
        confirmButtonText="Delete"
      />
    </div>
  );
}
