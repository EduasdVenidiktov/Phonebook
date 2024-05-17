import { selectFilteredContacts } from "../../redux/contacts/slice";
import Contact from "../Contact/Contact";
import SearchBox from "../SearchBox/SearchBox";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";

const ContactList = () => {
  const searchContact = useSelector((state) => state.contacts.searchContact);
  const filteredContacts = useSelector(selectFilteredContacts);
  return (
    <div>
      <SearchBox value={searchContact} onChange={() => {}} />
      <Grid container spacing={2}>
        {filteredContacts.map((item) => (
          <Grid key={item.id} item xs={4}>
            <Contact id={item.id} name={item.name} number={item.number} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ContactList;
