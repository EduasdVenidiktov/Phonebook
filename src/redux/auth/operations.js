import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

// axios.defaults.baseURL = "https://connections-api.herokuapp.com";
axios.defaults.baseURL = "/";
//Utility to add JWT отримє token і додає headers Authorization зі значенням Bairer ${token} на будь-який запит (common)
const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`; //Bairer ${token} - патерн
};

//Utility to remove JWT очищує token
const clearAuthHeader = () => {
  delete axios.defaults.headers.common.Authorization;
};

//========== Операції =================================

//для реєстрації нового користувача
/* POST @ /users/signup
  body: { name, email, password }
 */
const register = createAsyncThunk(
  "auth / register",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("/users/signup", credentials);
      // After successful registration, add the token to the HTTP header
      setAuthHeader(response.data.token); //якщо користувач залогінивс, то викликаємо setAuthHeader і додаємо в неї властивість token з бекенду
      return response.data; //у reducer повертаємо об'єкт {name, e-mail, token}
    } catch (error) {
      toast.error(
        "Invalid registration data. Please check your credentials and try again"
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//для логіну існуючого користувача
/* POST @ /users/login
  body: { name, email }
 */
const logIn = createAsyncThunk("auth/login", async (credentials, thunkAPI) => {
  try {
    const response = await axios.post("/users/login", credentials);
    // After successful login, add the token to the HTTP header
    setAuthHeader(response.data.token);
    return response.data;
  } catch (error) {
    toast.error("Wrong login.");
    return thunkAPI.rejectWithValue(error.message);
  }
});

//для виходу з додатка.
/* POST @ /users/logout
  headers: Authorization: Bearer token
 */
const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/users/logout");
    // After successful login, add the token to the HTTP header
    clearAuthHeader();
  } catch (error) {
    toast.error("Please try later");
    return thunkAPI.rejectWithValue(error.message);
  }
});

//оновлення користувача за токеном
/* GET @ /users/current
  headers: Authorization: Bearer token
 */
const refreshUser = createAsyncThunk("auth/refresh", async (_, thunkAPI) => {
  // Reading the token from the state via getState()

  const state = thunkAPI.getState(); //за допомогою thunkAPI читаємо стан
  const persistedToken = state.auth.token; //із стану state.auth беремо лище token
  if (persistedToken === null) {
    // If there is no token, exit without performing any request
    return thunkAPI.rejectWithValue("Unable to fetch user");
  }
  try {
    // If there is a token, add it to the HTTP header and perform the request
    setAuthHeader(persistedToken); //записуємо token на authHeader

    const response = await axios.get("/users/current"); // виконємо запит на /users/current, відправляючи лише token, а отримуємо e-mail та name. token при refresh не повертається

    return response.data;
  } catch (error) {
    toast.error("Something went wrong. Please try later");

    return thunkAPI.rejectWithValue(error.message);
  }
});

export { register, logIn, logOut, refreshUser };
