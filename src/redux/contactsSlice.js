import { createSelector, createSlice } from "@reduxjs/toolkit";
import { fetchContacts, deleteContacts, addContacts } from "./contactsOps";
import { selectContacts, selectFilterContact } from "./selectors";

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
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
      .addCase(deleteContacts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const deleteContactId = action.payload.id;
        state.items = state.items.filter((item) => item.id !== deleteContactId);
      })
      .addCase(deleteContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addContacts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = [action.payload, ...state.items];
      })
      .addCase(addContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Експорт редюсера
export const contactsReducer = contactsSlice.reducer;

export const { setSearchContact, setShowError } = contactsSlice.actions;

export default contactsSlice;

// Створення та експорт мемоізованого селектора selectFilteredContacts
export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilterContact],
  (contacts, filter) => {
    // Функція для фільтрації контактів
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(filter.toLowerCase()) ||
        contact.number.includes(filter)
    );
  }
);
