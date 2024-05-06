import Contact from "../Contact/Contact";
import SearchBox from "../SearchBox/SearchBox";
import css from "./ContactList.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilteredContacts,
  setSearchContact,
} from "../../redux/contactsSlice";

const ContactsList = () => {
  const searchContact = useSelector((state) => state.contacts.searchContact);

  const dispatch = useDispatch();
  const filteredContacts = useSelector((state) =>
    selectFilteredContacts(state, searchContact)
  );

  const handleInputChange = (event) => {
    if (event && event.target && event.target.value) {
      const { value } = event.target;
      if (value && value.trim()) {
        dispatch(setSearchContact(value.trim()));
      } else {
        dispatch(setSearchContact("")); // Очистити значення, якщо воно пусте
      }
    }
  };

  return (
    <div>
      <SearchBox value={searchContact} onChange={handleInputChange} />

      <ul className={css.contactList}>
        {filteredContacts.map((item) => (
          <li key={item.id}>
            <Contact
              id={item.id}
              name={item.name}
              country={item.country}
              number={item.number}
              mail={item.mail}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactsList;
