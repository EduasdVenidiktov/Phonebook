import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/auth/selectors";

/*Якщо маршрут обмежений і користувач увійшов в систему, відображаємо <Navigate> для перенаправлення до redirectTo
Інакше відображаємо компонент
 */

export const RestrictedRoute = ({ component: Component, redirectTo = "/" }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};
