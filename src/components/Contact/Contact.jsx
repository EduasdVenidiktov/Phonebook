import css from "./Contact.module.css";
import personIcon from "../../assets/person.svg";
import phoneIcon from "../../assets/phone.svg";
// import countryIcon from "../../assets/country.svg";
// import mailIcon from "../../assets/mail.svg";
import { deleteContact } from "../../redux/contacts/operations.js";

import { useDispatch } from "react-redux";

// export default function Contact({ id, name, number, mail, country }) {
export default function Contact({ id, name, number }) {
  const dispatch = useDispatch();
  const handleDelete = () => dispatch(deleteContact(id));
  return (
    <div className={css.contactContainer}>
      <div>
        <div className={css.infoBlock}>
          <img className={css.icon} src={personIcon} alt="Icon people" />
          <h3>{name}</h3>
        </div>
        {/* <div className={css.infoBlock}>
          <img className={css.icon} src={countryIcon} alt="Icon country" />
          <p>{country}</p>
        </div> */}
        <div className={css.infoBlock}>
          <img className={css.icon} src={phoneIcon} alt="Icon phone" />
          <a className={css.infoLink} href={`tel:${number}`}>
            {number}
          </a>
        </div>
        {/* <div className={css.infoBlock}>
          <img className={css.icon} src={mailIcon} alt="Icon mail" />
          <a className={css.infoLink} href={`tel:${mail}`}>
            {mail}
          </a>
        </div> */}
      </div>
      <div>
        <button className={css.buttonDelete} onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
