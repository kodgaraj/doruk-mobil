import { createSlice } from "@reduxjs/toolkit";

export const webViewUrl = createSlice({
  name: "webViewUrl",
  initialState: {
    shouldRedirectUrl: null,
    webViewRef: null,
  },
  reducers: {
    setShouldRedirectUrl: (state, action) => {
      state.shouldRedirectUrl = action.payload;
    },
    setWebViewRef: (state, action) => {
      state.webViewRef = action.payload;
    },
  },
});

export default webViewUrl.reducer;

// Actions

export const { setShouldRedirectUrl, setWebViewRef } = webViewUrl.actions;
