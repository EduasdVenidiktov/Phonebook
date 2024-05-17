import { useDispatch, useSelector } from "react-redux";
import { selectIsRefreshing } from "./redux/auth/selectors";
import { lazy, useEffect } from "react";
import { refreshUser } from "./redux/auth/operations";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { RestrictedRoute } from "./components/RestrictedRoute";
import { PrivateRoute } from "./components/PrivateRoute";
import toast from "react-hot-toast";

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

  //рендеримо розмітку діалогового вікна лише, якщо користувач незалогінений
  return isRefreshing ? (
    toast.loading(`Refresning user...`)
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
      </Routes>
    </Layout>
  );
};
