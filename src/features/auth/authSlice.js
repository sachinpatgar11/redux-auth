import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./authService";

const loadStoredAuth = () => {
  try {
    const user = localStorage.getItem("authUser");
    const token = localStorage.getItem("authToken");

    if (!user || !token) {
      return {
        user: null,
        token: null,
        isAuthenticated: false,
      };
    }

    return {
      user: JSON.parse(user),
      token,
      isAuthenticated: true,
    };
  } catch {
    localStorage.removeItem("authUser");
    localStorage.removeItem("authToken");

    return {
      user: null,
      token: null,
      isAuthenticated: false,
    };
  }
};

const initialState = {
  ...loadStoredAuth(),
  loading: false,
  error: null,
  registrationLoading: false,
  registrationError: null,
  registrationSuccess: false,
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      return await loginUser(credentials);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Unable to log in. Please check your credentials.",
      );
    }
  },
);

export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      return await registerUser(userData);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.registrationError = null;
      state.registrationSuccess = false;

      localStorage.removeItem("authUser");
      localStorage.removeItem("authToken");
    },

    clearAuthError: (state) => {
      state.error = null;
    },

    clearRegistrationStatus: (state) => {
      state.registrationError = null;
      state.registrationSuccess = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;

        const data = action.payload;
        const token = data.accessToken || data.token;

        if (!token) {
          state.error = "Authentication token was not returned.";
          return;
        }

        const user = {
          id: data.id,
          username: data.username,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          image: data.image,
        };

        state.user = user;
        state.token = token;
        state.isAuthenticated = true;

        localStorage.setItem("authUser", JSON.stringify(user));
        localStorage.setItem("authToken", token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed.";
        state.isAuthenticated = false;
      })
      .addCase(register.pending, (state) => {
        state.registrationLoading = true;
        state.registrationError = null;
        state.registrationSuccess = false;
      })
      .addCase(register.fulfilled, (state) => {
        state.registrationLoading = false;
        state.registrationSuccess = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.registrationLoading = false;
        state.registrationError = action.payload || "Registration failed.";
      });
  },
});

export const { logout, clearAuthError, clearRegistrationStatus } =
  authSlice.actions;

export default authSlice.reducer;
