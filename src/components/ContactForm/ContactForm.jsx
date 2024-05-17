import css from "./ContactForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik"; // Для того щоб відобразити користувачу помилки валідації, використовується компонент ErrorMessage.
import { useId } from "react";
import * as Yup from "yup"; //імпорт бібліотеки валідації в компонент форми.
import { useDispatch } from "react-redux";
import CounterContacts from "../Counter/Counter.jsx";
import { addContact } from "../../redux/contacts/operations.js";
import toast from "react-hot-toast";

const initialValues = {
  Name: "",
  Number: "",
};

export default function ContactForm() {
  const dispatch = useDispatch();
  const nameFieldId = useId(); //хук useId для створення унікальних ідентифікаторів полів.
  const numberFieldId = useId();
  const FeedbackSchema = Yup.object().shape({
    Name: Yup.string()
      .trim() //Yup.string(), Yup.min(), Yup.max(), Yup.required() - валідатори,
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),

    Number: Yup.string("Must be a valid number!").required("Required"),
  });

  // При відправці форми викликається колбек-функція
  const handleSubmit = (values, actions) => {
    const newContact = {
      name: values.Name,
      number: values.Number,
    };
    dispatch(addContact(newContact)); // Додаємо новий контакт до списку або передаємо його до батьківського компонента

    actions.resetForm(); //метод resetForm для очищення полів форми після відправки.

    toast.success("Contact added successfully");
  };

  return (
    <div className={css.wrap}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={FeedbackSchema} //пропс validationSchema, в який передана схема валідації Yup.
      >
        <Form className={css.form}>
          <div>
            <label htmlFor={nameFieldId}>Name</label>
            <Field
              className={css.field}
              type="text"
              name="Name"
              id={nameFieldId}
            />
            <ErrorMessage name="Name" component="p" className={css.errorMess} />
          </div>

          <div>
            <label htmlFor={numberFieldId}>Number</label>
            <Field
              className={css.field}
              type="text"
              name="Number"
              id={numberFieldId}
            />
            <ErrorMessage
              name="Number"
              component="p"
              className={css.errorMess}
            />
          </div>

          <CounterContacts />
          <button className={css.btnAdd} type="submit">
            Add contact
          </button>
        </Form>
      </Formik>
      <img
        src="https://media.tenor.com/GCbRbnL1MYwAAAAi/contact-phone-number.gif"
        alt="Phone gif"
        className={css.gif}
      />
    </div>
  );
}
