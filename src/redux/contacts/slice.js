import { createSelector, createSlice } from "@reduxjs/toolkit";

import { selectNameFilter } from "../filters/selectors";
import { addContact, deleteContact, fetchContacts } from "./operations";
import { logOut } from "../auth/operations";

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(logOut.fulfilled, (state) => {
        state.items = [];
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const deleteContactId = action.payload.id;
        state.items = state.items.filter((item) => item.id !== deleteContactId);
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = [action.payload, ...state.items];
      })
      .addCase(addContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

const contactsReducer = contactsSlice.reducer;

const { setSearchContact, setShowError } = contactsSlice.actions;
// Внутрішній селектор для отримання всіх контактів
const selectContacts = (state) => state.contacts.items;

// Створення та експорт мемоізованого селектора selectFilteredContacts
const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filter) => {
    // Функція для фільтрації контактів
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(filter.toLowerCase()) ||
        contact.number.includes(filter)
    );
  }
);

export default contactsSlice;
export {
  contactsReducer,
  setSearchContact,
  setShowError,
  selectFilteredContacts,
};
