import css from "./Contact.module.css";
import personIcon from "../../assets/person.svg";
import phoneIcon from "../../assets/phone.svg";

import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import {
  deleteContact,
  updateContact,
} from "../../redux/contacts/operations.js"; // Додаємо імпорт операції оновлення контакту
import ModalEdit from "../ModalEdit/ModalEdit.jsx"; // Імпортуємо компонент ModalEdit
import Modal from "../Modal/Modal.jsx";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";

export default function Contact({ id, name, number }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedNumber, setEditedNumber] = useState(number);

  const dispatch = useDispatch();

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };
  useEffect(() => {
    setEditedName(name);
    setEditedNumber(number);
  }, [name, number]);

  const handleSaveClick = () => {
    const updatedContact = {
      id: id,
      name: editedName,
      number: editedNumber,
    };
    dispatch(updateContact(updatedContact)); // Викликаємо операцію оновлення контакту
    setIsEditModalOpen(false);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () =>
    dispatch(deleteContact(id))
      .then(() => {
        setIsDeleteModalOpen(false);
      })
      .catch(() => {});

  return (
    <Grid item className={css.contactContainer}>
      <div>
        <Box>
          <div className={css.infoBlock}>
            <img className={css.icon} src={personIcon} alt="Icon people" />
            <Typography variant="h6" sx={{ fontSize: "1.2rem" }}>
              {name}
            </Typography>
          </div>

          <div className={css.infoBlock}>
            <img className={css.icon} src={phoneIcon} alt="Icon phone" />
            <Typography
              component="a"
              href={`tel:${number}`}
              sx={{ fontSize: "1rem", mb: "0.5rem" }}
            >
              {number}
            </Typography>
          </div>
        </Box>

        <Stack direction="row" justifyContent="space-between">
          <Button variant="contained" size="medium" onClick={handleEditClick}>
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={handleDeleteClick}
          >
            Delete
          </Button>
        </Stack>
      </div>

      <ModalEdit
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onConfirm={handleSaveClick}
        cancelButtonText="Cancel"
        confirmButtonText="Save"
        editedName={editedName}
        setEditedName={setEditedName}
        editedNumber={editedNumber}
        setEditedNumber={setEditedNumber}
      />

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        cancelButtonText="Cancel"
        confirmButtonText="Delete"
      />
    </Grid>
  );
}
