import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from './authService';
import { tokenManager } from '../../../shared/utils/tokenManager';

// Login
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    const result = await authService.login(email, password);
    if (!result.success) {
      return rejectWithValue(result.message);
    }
    return result.data;
  }
);

export const getProfile = createAsyncThunk(
  "auth/profile",
  
  async (_, { rejectWithValue }) => {
    const result = await authService.getProfile();

    if (!result.success) {
      return rejectWithValue(result.message);
    }

    return result.data;
  }
);
 

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    const result = await authService.register(userData);

    if (!result.success) {
      return rejectWithValue(result.message);
    }

    return result.data;
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const refreshToken = tokenManager.getRefreshToken();

      if (refreshToken) {
        const result = await authService.logout(refreshToken);
        
        if (!result.success) {
          console.warn('Logout API failed but continuing...');
        }
      } else {
        console.warn(' No refresh token found for logout');
      }
      
       
      tokenManager.clearAll();
      
      return true;
    } catch (error) {
      console.error(' Logout error:', error);
       
      tokenManager.clearAll();
      return true;
    }
  }
);

// Initial State
const initialState = {
  user: tokenManager.getUser(),
  isAuthenticated: tokenManager.isAuthenticated(),
  isLoading: false,
  error: null,
  success: false,
};

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    resetState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.success = false;
    },
    checkAuth: (state) => {
      state.isAuthenticated = tokenManager.isAuthenticated();
      state.user = tokenManager.getUser();
    },
     
    manualLogout: (state) => {
      console.log('🔄 Manual logout called');
      state.isAuthenticated = false;
      state.user = null;
      state.success = false;
      tokenManager.clearAll();
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
.addCase(loginUser.fulfilled, (state, action) => {
  state.isLoading = false;
  state.isAuthenticated = true;
  state.success = true;

  const { accessToken, refreshToken, user } = action.payload;

  tokenManager.setAccessToken(accessToken);
  tokenManager.setRefreshToken(refreshToken);
  tokenManager.setUser(user);

  state.user = user;
})
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload || 'Login failed';
      })


.addCase(getProfile.pending, (state) => {
    state.isLoading = true;
})

.addCase(getProfile.fulfilled, (state, action) => {
    state.isLoading = false;
    state.user = action.payload;
})

.addCase(getProfile.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
})


      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.success = false;
        // Token Manager already cleared in thunk
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.success = false;
        tokenManager.clearAll(); // Extra safety
      });
  },
});

export const { clearError, clearSuccess, resetState, checkAuth, manualLogout } = authSlice.actions;
export default authSlice.reducer;