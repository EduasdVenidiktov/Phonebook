import { configureStore } from "@reduxjs/toolkit";
import { contactsReducer } from "./contactsSlice";
import { filtersReducer } from "./filtersSlice";

const store = configureStore({
  reducer: {
    contacts: contactsReducer, // Первісний редусер для контактів
    filters: filtersReducer,
  },
});

export default store;
