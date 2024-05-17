import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import Navigation from "../Navigation/Navigation";
import { UserMenu } from "../UserMenu/UserMenu";
import AuthNav from "../AuthNav/AuthNav";
import { AppBar as MuiAppBar, Toolbar } from "@mui/material";

const AppBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <MuiAppBar position="static" style={{ marginBottom: "20px" }}>
      <Toolbar>
        <Navigation />
        {isLoggedIn ? <UserMenu /> : <AuthNav />}
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
