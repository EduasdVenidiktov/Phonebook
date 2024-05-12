// import { useDispatch, useSelector } from "react-redux"; // Додано useSelector
// import { logIn } from "../../redux/auth/operations";
// import css from "./LoginForm.module.css";
// import { ErrorMessage, Field, Form, Formik } from "formik";
// import * as Yup from "yup"; // Імпорт бібліотеки валідації в компонент форми.
// import { useId } from "react";
// import { useEffect } from "react";
// import { useHistory } from "react-router-dom";

// const initialValues = {
//   email: "",
//   password: "",
// };

// export const LoginForm = () => {
//   const emailFieldId = useId();
//   const passwordFieldId = useId();

//   const dispatch = useDispatch();
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Додано useSelector для отримання стану авторизації

//   const FeedbackSchema = Yup.object().shape({
//     email: Yup.string()
//       .trim()
//       .min(3, "Too Short!")
//       .max(50, "Too Long!")
//       .email("Invalid email")
//       .required("E-mail is required"),

//     password: Yup.string()
//       .min(8, "Password must be at least 8 characters")
//       .max(20, "Password must not exceed 20 characters")
//       .required("Password is required"),
//   });

//   const handleSubmit = (values, { resetForm }) => {
//     dispatch(
//       logIn({
//         email: values.email,
//         password: values.password,
//       })
//     )
//       .unwrap()
//       .then(() => {
//         console.log("login success");
//       })
//       .catch(() => {
//         console.log("login error");
//       });

//     resetForm();
//   };

//   const history = useHistory();

//   useEffect(() => {
//     if (isAuthenticated) {
//       history.push("/contacts");
//     }
//   }, [isAuthenticated, history]);

//   return (
//     <Formik
//       initialValues={initialValues}
//       onSubmit={handleSubmit}
//       validationSchema={FeedbackSchema}
//     >
//       <Form className={css.form}>
//         <div>
//           <label htmlFor={emailFieldId}>E-mail</label>
//           <Field
//             type="text"
//             name="email"
//             className={css.field}
//             id={emailFieldId}
//             placeholder="mail@example.com"
//           />
//           <ErrorMessage name="email" component="p" className={css.errorMess} />
//         </div>
//         <div>
//           <label htmlFor={passwordFieldId}>Password</label>

//           <Field
//             className={css.field}
//             type="password"
//             name="password"
//             id={passwordFieldId}
//           />
//           <ErrorMessage className={css.field} name="password" component="p" />
//         </div>
//         <button type="submit" className={css.btnAdd}>
//           Log In
//         </button>
//       </Form>
//     </Formik>
//   );
// };

//============================================================================
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import css from "./LoginForm.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup"; //імпорт бібліотеки валідації в компонент форми.
import { useId } from "react";

const initialValues = {
  email: "",
  password: "",
};
export const LoginForm = () => {
  const emailFieldId = useId();
  const passwordFieldId = useId();

  const dispatch = useDispatch();

  const FeedbackSchema = Yup.object().shape({
    email: Yup.string()
      .trim() //Yup.string(), Yup.min(), Yup.max(), Yup.required() - валідатори,
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .email("Invalid email")
      .required("E-mail is required"),

    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must not exceed 20 characters")
      .required("Password is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    dispatch(
      logIn({
        email: values.email,
        password: values.password,
      })
    )
      .unwrap()
      .then(() => {
        console.log("login success");
      })
      .catch(() => {
        console.log("login error");
      });

    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      <Form className={css.form}>
        <div>
          <label htmlFor={emailFieldId}>E-mail</label>
          <Field
            type="text"
            name="email"
            className={css.field}
            id={emailFieldId}
            placeholder="mail@example.com"
          />
          <ErrorMessage name="email" component="p" className={css.errorMess} />
        </div>
        <div>
          <label htmlFor={passwordFieldId}>Password</label>

          <Field
            className={css.field}
            type="password"
            name="password"
            id={passwordFieldId}
          />
          <ErrorMessage className={css.field} name="password" component="p" />
        </div>
        <button type="submit" className={css.btnAdd}>
          Log In
        </button>
      </Form>
    </Formik>
  );
};
