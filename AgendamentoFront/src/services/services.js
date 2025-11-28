// src/services/services.js
import api from './api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useServices = () => useQuery({
  queryKey: ['services'],
  queryFn: async () => {
    const { data } = await api.get('/services');
    return data;
  },
});

export const useCreateService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newService) => api.post('/services', newService),
    onSuccess: () => queryClient.invalidateQueries(['services']),
  });
};

export const useUpdateService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }) => api.put(`/services/${id}`, data),
    onSuccess: () => queryClient.invalidateQueries(['services']),
  });
};

export const useDeleteService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.delete(`/services/${id}`),
    onSuccess: () => queryClient.invalidateQueries(['services']),
  });
};