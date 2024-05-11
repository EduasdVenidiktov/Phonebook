import { useDispatch, useSelector } from "react-redux";
import { selectIsRefreshing } from "./redux/auth/selectors";
import { lazy, useEffect } from "react";
import { refreshUser } from "./redux/auth/operations";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { RestrictedRoute } from "./components/RestrictedRoute";
import { PrivateRoute } from "./components/PrivateRoute";

const HomePage = lazy(() => import("./components/pages/HomePage/HomePage"));
const RegisterPage = lazy(() =>
  import("./components/pages/RegisterPage/RegisterPage")
);
const LoginPage = lazy(() => import("./components/pages/LoginPage/LoginPage"));
const ContactsPage = lazy(() =>
  import("./components/pages/ContactsPage/ContactsPage")
);

export const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]); //виконується завжди, одразу після монтування

  //рендеримо розмітку діалогового вікна лище, якщо користувач незалогінений
  return isRefreshing ? (
    <b>Refresning user...</b>
  ) : (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/register"
          element={
            <RestrictedRoute
              redirectTo="/contacts"
              component={<RegisterPage />}
            />
          }
        />
        <Route
          path="/login"
          element={
            <RestrictedRoute redirectTo="/contacts" component={<LoginPage />} />
          }
        />
        <Route
          path="/contacts"
          element={
            <PrivateRoute redirectTo="/login" component={<ContactsPage />} />
          }
        />
        {/*якщо жоден інший маршрут не підійде.
          <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Layout>
  );
};
//=========================================================================
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { fetchContacts } from "./redux/contactsOps";
// import { selectContactsState } from "./redux/selectors";
// import ContactForm from "./components/ContactForm/ContactForm";

// import css from "./App.module.css";
// import ContactsList from "./components/ContactList/ContactList";
// import Loader from "./components/Loader/Loader";
// import toast, { Toaster } from "react-hot-toast";
// import { setSearchContact } from "./redux/contacts/slice";

// export default function App() {
//   const dispatch = useDispatch();

//   const handleSearchChange = (value) => {
//     dispatch(setSearchContact(value));
//   };

//   const contactsState = useSelector(selectContactsState);
//   useEffect(() => {
//     dispatch(fetchContacts()).catch(() => {
//       toast.error("Failed to load contacts. Please try again later.");
//     });
//   }, [dispatch]);

//   const { isLoading } = contactsState;

//   return (
//     <div className={css.container}>
//       <header>
//         <h1 className={css.title}>Phonebook</h1>
//       </header>
//       <ContactForm contacts={contactsState} />
//       {isLoading ? <Loader /> : null}
//       <ContactsList
//         searchContact={contactsState.searchContact}
//         onSearchChange={handleSearchChange}
//       />
//       <Toaster position="top-center" />{" "}
//     </div>
//   );
// }
