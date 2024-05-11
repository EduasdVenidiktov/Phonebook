import { selectFilteredContacts } from "../../redux/contacts/slice";
import Contact from "../Contact/Contact";
import SearchBox from "../SearchBox/SearchBox";
import css from "./ContactList.module.css";
import { useSelector } from "react-redux";

const ContactList = () => {
  const searchContact = useSelector((state) => state.contacts.searchContact);
  const filteredContacts = useSelector(selectFilteredContacts);
  return (
    <div>
      <SearchBox value={searchContact} onChange={() => {}} />
      <ul className={css.contactList}>
        {filteredContacts.map((item) => (
          <li key={item.id}>
            <Contact
              id={item.id}
              name={item.name}
              // country={item.country}
              number={item.number}
              // mail={item.mail}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
