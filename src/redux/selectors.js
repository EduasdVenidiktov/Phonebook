import { createSelector } from "@reduxjs/toolkit";

export const selectContactsState = (state) => state.contacts; //отримуємо списко контактів з Redux

export const selectIsLoading = (state) => selectContactsState(state).isLoading;
export const selectError = (state) => selectContactsState(state).error;

// Селектор для отримання значення фільтру зі стану Redux
export const selectFilterContact = (state) => state.filters.searchContact;

// Складний селектор для отримання списку контактів зі стану Redux
export const selectContacts = (state) => selectContactsState(state).items;

// Складний селектор для отримання довжини списку контактів
export const selectContactsCount = createSelector(
  selectContacts,
  (contacts) => contacts.length
);

export default selectContactsCount;
