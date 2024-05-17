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

// Селектор для отримання значення фільтра імені
const selectNameFilter = (state) => state.filters.nameFilter;

// Селектор для фільтрації контактів за іменем
const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, nameFilter) => {
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(nameFilter.toLowerCase()) ||
        contact.number.includes(nameFilter)
    );
  }
);

export {
  selectIsLoading,
  selectError,
  selectContacts,
  selectContactsCount,
  selectFilteredContacts,
};
