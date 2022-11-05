import { Realtor } from '../entities/realtor.interface';
import { realtors } from '../../mocks/realtors';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getRealtorsUC = createAsyncThunk(
  'realtors/fetchRealtors',
  async (realtorId: string) => {
    const unreadCount = realtors.filter(
      (realtor: Realtor) => realtor.id === Number(realtorId),
    )[0].unread_messages;

    return { realtors, unreadCount };
  },
);

export const setSelectedRealtorUC = createAsyncThunk(
  'realtors/setSelectedRealtor',
  async (realtorId: string) => {
    return realtorId;
  },
);
