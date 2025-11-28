import api from './api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useUsers = () => useQuery({
  queryKey: ['users'],
  queryFn: async () => (await api.get('/users')).data,
});

export const createUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => api.post('/users', data),
    onSuccess: () => queryClient.invalidateQueries(['users']),
  });
};

// Similar para update e delete