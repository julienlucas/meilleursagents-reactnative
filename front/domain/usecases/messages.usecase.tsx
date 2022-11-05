import { Message } from '../entities/message.interface';
import { Store } from '../entities/store.interface';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { messagesRealtor101 } from '../../mocks/messagesRealtor101';
import { messagesRealtor102 } from '../../mocks/messagesRealtor102';
import { messagesRealtor103 } from '../../mocks/messagesRealtor103';

export const getMessagesUC = createAsyncThunk(
  'messages/fetchMessages',
  async (realtorId: number): Promise<Message[]> => {
    if (realtorId === 101) {
      const messages = messagesRealtor101.sort((a: Message ,b: Message) => new Date(b.date).getTime() - new Date(a.date).getTime());

      return messages;
    }
    if (realtorId === 102) {
      const messages = messagesRealtor102.sort((a: Message ,b: Message) => new Date(b.date).getTime() - new Date(a.date).getTime());

      return messages;
    }
    if (realtorId === 103) {
      const messages = messagesRealtor103.sort((a: Message ,b: Message) => new Date(b.date).getTime() - new Date(a.date).getTime());

      return messages;
    }

    const messages = messagesRealtor101.sort((a: Message ,b: Message) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return messages;
  },
);

export const getSelectedMessageUC = createAsyncThunk(
  'messages/fetchSelectedMessage',
  async (messageId: string, { getState }): Promise<Message> => {
    const state: Store | any = getState();
    const message = state.messages.filter((message: Message) => message.id.toString() === messageId)[0];

    return message;
  },
);

export const setMessageReadedUC = createAsyncThunk(
  'messages/postMessageAsReaded',
  async (messageId: string, { getState }): Promise<{
    messages: Message[];
    unreadCount: number;
  }> => {
    const state: Store | any = getState();

    const message = state.messages.filter((message: Message) => message.id === Number(messageId))[0];
    const unreadCount = message.read ? state.unreadCount : state.unreadCount - 1;

    const messages = state.messages.map((message: Message) => {
      if (message.id.toString() === messageId) {
        return {...message, read: true }
      }

      return message
    });

    return { messages, unreadCount };
  },
);