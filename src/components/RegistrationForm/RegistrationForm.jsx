import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./RegistrationForm.module.css";

const RegistrationForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(register(values));
    resetForm();
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long!")
      .required("Required"),
  });

  return (
    <div className={css.wrap}>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className={css.form}>
          <div>
            <label htmlFor="name">Name</label>
            <Field className={css.field} type="text" name="name" />
            <ErrorMessage className={css.field} name="name" component="p" />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <Field className={css.field} type="email" name="email" />
            <ErrorMessage className={css.field} name="email" component="p" />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <Field className={css.field} type="password" name="password" />
            <ErrorMessage className={css.field} name="password" component="p" />
          </div>

          <button className={css.btnAdd} type="submit">
            Register
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
};

export default RegistrationForm;
