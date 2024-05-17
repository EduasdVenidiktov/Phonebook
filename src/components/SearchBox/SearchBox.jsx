import { useDispatch } from "react-redux";
import { setStatusFilter } from "../../redux/filters/slice";
import { Box, TextField, Typography } from "@mui/material";

const SearchBox = ({ value, onChange }) => {
  const dispatch = useDispatch();
  const handleInputChange = (ev) => {
    const newValue = ev.target.value.trim();

    onChange(newValue); // Викликаємо функцію onChange для оновлення значення в батьківському компоненті
    dispatch(setStatusFilter(newValue));
  };

  return (
    <Box
      sx={{
        width: 1000,
        maxWidth: "100%",
        marginBottom: "2rem", // Adding bottom margin to the box
      }}
    >
      <Typography variant="h5" color="coral">
        Find contacts by name
      </Typography>
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
