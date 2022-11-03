import { createSlice } from '@reduxjs/toolkit';
import { Store } from '../domain/entities/store.interface';
import {
  getMessagesUC,
  getSelectedMessageUC,
  setDefaultSelectedMessageUC,
  getMessagesPaginatedUC,
  setMessageReadedUC,
  setSelectedMessageKeyPressUC,
} from '../domain/usecases/messages.usecase';
import { getRealtorsUC, setSelectedRealtorUC } from '../domain/usecases/realtors.usecase';
import { messagesRealtor101 } from '../mocks/messagesRealtor101';

export const initialState: Store = {
  realtors: [],
  messages: messagesRealtor101,
  selectedRealtorId: '',
  selectedMessageId: '',
  // selectedRealtorId: localStorage.getItem('selectedRealtorId') || '',
  // selectedMessageId: localStorage.getItem('selectedMessageId') || '',
  selectedMessage: null,
  unreadCount: 0,
  page: 1,
};

const slice = createSlice({
  name: 'reducers',
  initialState,
  reducers: {
    setPage(state) {
      state = {
        ...state,
        page: state.page + 1,
      };
      return state;
    },
    resetPage(state) {
      state = {
        ...state,
        page: 1,
      };
      return state;
    },
    resetStore() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getMessagesUC.fulfilled, (state, { payload }) => {
        // @ts-ignore: Unreachable code error
        state.messages = payload;
      })
      .addCase(getMessagesPaginatedUC.fulfilled, (state, { payload }) => {
        state.messages = state.messages.concat(payload);
      })
      .addCase(getSelectedMessageUC.fulfilled, (state, { payload }) => {
        state.selectedMessage = payload;
        state.selectedMessageId = payload.id.toString();
      })
      .addCase(setDefaultSelectedMessageUC.fulfilled, (state, { payload }) => {
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
      .addCase(setSelectedMessageKeyPressUC.fulfilled, (state, { payload }) => {
        state.selectedMessage = payload;
        state.selectedMessageId = payload.id.toString();
      });
  },
});

export const { setPage, resetPage, resetStore } = slice.actions;

export default slice.reducer;
