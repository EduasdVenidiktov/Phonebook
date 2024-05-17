import { createSelector } from "@reduxjs/toolkit";

// export const selectLoading = (state) => state.contacts.loading;
const selectIsLoading = (state) => state.contacts.isLoading;

// Складний селектор для отримання списку контактів зі стану Redux
const selectContacts = (state) => state.contacts.items;

const selectError = (state) => state.contacts.error;

// Складний селектор для отримання довжини списку контактів
const selectContactsCount = createSelector(
  selectContacts,
  (contacts) => contacts.length
);

export { selectIsLoading, selectError, selectContacts, selectContactsCount };
