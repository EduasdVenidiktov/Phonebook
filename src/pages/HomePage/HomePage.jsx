import { Typography } from "@mui/material";
import DocumentTitle from "../../components/DocumentTitle";
import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <>
      <DocumentTitle>Home</DocumentTitle>

      <div className={css.container}>
        <Typography
          variant="h2"
          component="span"
          color="primary"
          className={css.customText}
        >
          Welcom to your contacts manager!
          <img
            src="https://media.tenor.com/GCbRbnL1MYwAAAAi/contact-phone-number.gif"
            alt="Phone gif"
            className={css.gif}
          />
        </Typography>
      </div>
    </>
  );
}
