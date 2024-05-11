import { useDispatch, useSelector } from "react-redux";
import DocumentTitle from "../../DocumentTitle";
import { useEffect } from "react";
// import { fetchContacts } from "../../../redux/contacts/operations.js";
import {
  selectError,
  selectIsLoading,
} from "../../../redux/contacts/selectors";
import ContactForm from "../../ContactForm/ContactForm";
// import SearchBox from "../../SearchBox/SearchBox";
import { fetchContacts } from "../../../redux/contacts/operations";
import ContactList from "../../ContactList/ContactList";

export default function ContactsPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      {/* <DocumentTitle title="Your contacts" /> */}
      <DocumentTitle>Your contacts</DocumentTitle>
      <ContactForm />
      {/* <SearchBox /> */}
      {/* {isLoading && !error && <p>Request in progress...</p>}
            {visibleContacts.length === 0 ? (
                contacts.length !== 0 ? (
                <Notification text = {"There are no contacts matching your request."}/>) :
                <>
                    <Notification text = {"There are no contacts yet, but you can add new one's!"}/>
                </>
                ) : <ContactList/> */}
      {isLoading && !error && <p>Request in progress...</p>}
      {error ? <p>Error: {error}</p> : <ContactList />}
    </div>
  );
}
