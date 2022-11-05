import { createSlice } from '@reduxjs/toolkit';
import { Store } from '../domain/entities/store.interface';
import {
  getMessagesUC,
  getSelectedMessageUC,
  setMessageReadedUC,
} from '../domain/usecases/messages.usecase';
import { getRealtorsUC, setSelectedRealtorUC } from '../domain/usecases/realtors.usecase';

export const initialState: Store = {
  realtors: [],
  messages: [],
  selectedRealtorId: '',
  selectedMessageId: '',
  selectedMessage: null,
  unreadCount: 0
};

const slice = createSlice({
  name: 'reducers',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getMessagesUC.fulfilled, (state, { payload }) => {
        state.messages = payload;
      })
      .addCase(getSelectedMessageUC.fulfilled, (state, { payload }) => {
        state.selectedMessage = payload;
        state.selectedMessageId = payload.id.toString();
      })
      .addCase(setMessageReadedUC.fulfilled, (state, { payload }) => {
        state.messages = payload.messages;
        state.unreadCount = payload.unreadCount;
      })
      .addCase(getRealtorsUC.fulfilled, (state, { payload }) => {
        const { realtors, unreadCount } = payload;
        state.realtors = realtors;
        state.unreadCount = unreadCount;
      })
      .addCase(setSelectedRealtorUC.fulfilled, (state, { payload }) => {
        state.selectedRealtorId = payload;
      })
  },
});

export const { } = slice.actions;

export default slice.reducer;
