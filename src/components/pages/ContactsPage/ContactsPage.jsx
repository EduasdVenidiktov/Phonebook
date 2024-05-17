import { useDispatch, useSelector } from "react-redux";
import DocumentTitle from "../../DocumentTitle";
import { useEffect } from "react";
import {
  selectError,
  selectIsLoading,
} from "../../../redux/contacts/selectors";
import ContactForm from "../../ContactForm/ContactForm";
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
      <DocumentTitle>Your contacts</DocumentTitle>
      <ContactForm />

      {isLoading && !error && <p>Request in progress...</p>}
      {error ? <p>Error: {error}</p> : <ContactList />}
    </div>
  );
}
