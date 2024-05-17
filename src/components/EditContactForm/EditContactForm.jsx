import { useState } from "react";
import { useDispatch } from "react-redux";
import { editContact } from "../redux/contacts/actions";

const EditContactForm = ({ contact }) => {
  const [name, setName] = useState(contact.name);
  const [email, setEmail] = useState(contact.email);

  const dispatch = useDispatch();

  const handleEdit = () => {
    // Відправляємо PATCH-запрос на сервер для оновлення контакту
    dispatch(editContact(contact.id, { name, email }));
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleEdit}>Save</button>
    </div>
  );
};

export default EditContactForm;
