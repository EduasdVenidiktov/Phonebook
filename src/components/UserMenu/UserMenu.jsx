import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { logOut } from "../../redux/auth/operations";
import { Box, Button, Typography } from "@mui/material";
import css from "./UserMenu.module.css";

export const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <Box sx={{ marginLeft: "auto" }}>
      <Typography
        variant="h6"
        component="span"
        className={css.welcomeText}
        sx={{ marginRight: "20px" }}
      >
        Welcome, {user.name}
      </Typography>
      <Button type="button" onClick={() => dispatch(logOut())} color="warning">
        <Typography
          variant="h6"
          component="span"
          className={css.customLogoutText}
        >
          Logout
        </Typography>
      </Button>
    </Box>
  );
};
