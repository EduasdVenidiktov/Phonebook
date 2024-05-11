import { useSelector } from "react-redux";
import css from "./Counter.module.css";
import { selectContactsCount } from "../../redux/contacts/selectors";

const CounterContacts = () => {
  const count = useSelector(selectContactsCount);

  return (
    <div className={css.text}>
      <p>
        Total contacts: <span className={css.number}>{count}</span>
      </p>
    </div>
  );
};

export default CounterContacts;
