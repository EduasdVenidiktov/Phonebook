import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "https://connections-api.herokuapp.com/contacts"
      );
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
      const response = await axios.post(
        "https://connections-api.herokuapp.com/contacts",
        newItem
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Invalid contact data. Please check the data you entered.");
      } else if (error.response && error.response.status === 401) {
        toast.error("Unauthorized. Please log in to add a contact.");
      } else {
        toast.error("Failed to add contact. Please try again later.");
      }

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const deleteContact = createAsyncThunk(
  "contacts/delete",
  async (itemId, thunkAPI) => {
    try {
      const response = await axios.delete(
        `https://connections-api.herokuapp.com/contacts/${itemId}`
      );
      return response.data;
    } catch (ev) {
      toast.error("Contact don`t deleted");

      return thunkAPI.rejectWithValue(ev.message);
    }
  }
);

const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async (updatedContact, thunkAPI) => {
    const { id, name, number } = updatedContact;
    try {
      const response = await axios.patch(
        `https://connections-api.herokuapp.com/contacts/${id}`,
        {
          name: name,
          number: number,
        }
      );
      return response.data;
    } catch (error) {
      toast.error("Contact don`t changed");

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export { fetchContacts, addContact, deleteContact, updateContact };
