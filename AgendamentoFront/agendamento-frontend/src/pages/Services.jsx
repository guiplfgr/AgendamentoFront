import { useServices, useCreateService, useUpdateService, useDeleteService } from '../services/services';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';

const serviceSchema = z.object({
  name: z.string().min(3, 'Mínimo 3 caracteres'),
  description: z.string().min(10, 'Mínimo 10 caracteres'),
  duration: z.number().min(15).max(480),
  price: z.number().min(0),
});

export default function Services() {
  const { data: services, isLoading } = useServices();
  const createMutation = useCreateService();
  const updateMutation = useUpdateService();
  const deleteMutation = useDeleteService();
  const [isOpen, setIsOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(serviceSchema),
  });

  const onSubmit = (data) => {
    const promise = editingService
      ? updateMutation.mutateAsync({ id: editingService._id, ...data })
      : createMutation.mutateAsync(data);

    toast.promise(promise, {
      loading: 'Salvando...',
      success: 'Serviço salvo!',
      error: 'Erro ao salvar',
    });

    promise.then(() => {
      setIsOpen(false);
      reset();
      setEditingService(null);
    });
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setValue('name', service.name);
    setValue('description', service.description);
    setValue('duration', service.duration);
    setValue('price', service.price);
    setIsOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm('Tem certeza?')) {
      toast.promise(deleteMutation.mutateAsync(id), {
        loading: 'Excluindo...',
        success: 'Serviço excluído',
        error: 'Erro ao excluir',
      });
    }
  };

  if (isLoading) return <div className="p-8">Carregando serviços...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Serviços</h1>
        <button
          onClick={() => { setEditingService(null); reset(); setIsOpen(true); }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus size={20} /> Novo Serviço
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services?.map((service) => (
          <div key={service._id} className="bg-white rounded-lg shadow p-6 border">
            <h3 className="text-xl font-semibold">{service.name}</h3>
            <p className="text-gray-600 mt-2">{service.description}</p>
            <div className="mt-4 flex justify-between items-center">
              <div>
                <span className="text-lg font-bold text-green-600">R$ {service.price}</span>
                <span className="text-sm text-gray-500 ml-2">• {service.duration} min</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(service)} className="text-blue-600 hover:bg-blue-50 p-2 rounded">
                  <Edit size={18} />
                </button>
                <button onClick={() => handleDelete(service._id)} className="text-red-600 hover:bg-red-50 p-2 rounded">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl mb-4">{editingService ? 'Editar' : 'Novo'} Serviço</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input {...register('name')} placeholder="Nome" className="border p-2 w-full mb-3 rounded" />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

              <textarea {...register('description')} placeholder="Descrição" rows={3} className="border p-2 w-full mb-3 rounded" />
              {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input {...register('duration', { valueAsNumber: true })} type="number" placeholder="Duração (min)" className="border p-2 w-full rounded" />
                  {errors.duration && <p className="text-red-500 text-sm">{errors.duration.message}</p>}
                </div>
                <div>
                  <input {...register('price', { valueAsNumber: true })} type="number" step="0.01" placeholder="Preço" className="border p-2 w-full rounded" />
                  {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                  Salvar
                </button>
                <button type="button" onClick={() => setIsOpen(false)} className="bg-gray-300 px-6 py-2 rounded hover:bg-gray-400">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}