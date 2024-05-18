import { useDispatch } from "react-redux";
import { setStatusFilter } from "../../redux/filters/slice";
import { Box, TextField, Typography } from "@mui/material";
import css from "./SearchBox.module.css";

const SearchBox = ({ value, onChange }) => {
  const dispatch = useDispatch();
  const handleInputChange = (ev) => {
    const newValue = ev.target.value.trim();

    onChange(newValue); // Викликаємо функцію onChange для оновлення значення в батьківському компоненті
    dispatch(setStatusFilter(newValue));
  };

  return (
    <Box className={css.customSearchBox}>
      <Typography variant="h4">Find contacts by name</Typography>
      <TextField
        fullWidth
        id="fullWidth"
        variant="filled"
        type="search"
        value={value}
        onChange={handleInputChange}
        label="Name or phone"
      />
    </Box>
  );
};

export default SearchBox;
