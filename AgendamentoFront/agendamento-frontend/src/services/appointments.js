// src/services/appointments.js
import api from './api';
import { useQuery } from '@tanstack/react-query';

export const useAppointments = () => {
  return useQuery({
    queryKey: ['appointments'],
    queryFn: async () => {
      const { data } = await api.get('/appointments');
      return data;
    },
  });
};