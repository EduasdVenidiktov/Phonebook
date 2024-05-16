import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

axios.defaults.baseURL = "https://connections-api.herokuapp.com/";

const fetchContacts = createAsyncThunk(
  "contacts / fetchAll",
  // Використовуємо символ підкреслення як ім'я першого параметра,тому що в цій операції він нам не потрібен
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/contacts");
      // При успішному запиті повертаємо проміс із даними
      return response.data;
    } catch (ev) {
      toast.error("Failed to load contacts. Please try again later.");
      return thunkAPI.rejectWithValue(ev.message);
    }
  }
);

const addContact = createAsyncThunk(
  "contacts/add",

  async (newItem, thunkAPI) => {
    try {
      const response = await axios.post("/contacts", newItem);
      return response.data;
    } catch (ev) {
      return thunkAPI.rejectWithValue(ev.message);
    }
  }
);

const deleteContact = createAsyncThunk(
  "contacts/delete",
  async (itemId, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${itemId}`);
      return response.data;
    } catch (ev) {
      return thunkAPI.rejectWithValue(ev.message);
    }
  }
);

// Операция для обновления контакта
const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async (updatedContact, thunkAPI) => {
    const { id, name, number } = updatedContact;
    try {
      // Отправляем PATCH-запрос на сервер для обновления контакта
      const response = await axios.patch(`/contacts/${id}`, {
        name: name,
        number: number,
      });

      // Возвращаем данные обновленного контакта для обработки в компоненте
      return response.data;
    } catch (error) {
      // Если произошла ошибка, можно обработать её здесь
      // Например, можно отправить действие для обработки ошибки в хранилище Redux
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export { fetchContacts, addContact, deleteContact, updateContact };
