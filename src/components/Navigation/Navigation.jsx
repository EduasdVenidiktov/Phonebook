import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import css from "./Navigation.module.css";
import clsx from "clsx";

import { selectIsLoggedIn } from "../../redux/auth/selectors";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};
const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <nav>
      <ul className={css.navButton}>
        <li>
          <NavLink to="/" className={buildLinkClass}>
            Home
          </NavLink>
        </li>
        <li>
          {isLoggedIn && (
            <NavLink to="/contacts" className={buildLinkClass}>
              Contacts
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
