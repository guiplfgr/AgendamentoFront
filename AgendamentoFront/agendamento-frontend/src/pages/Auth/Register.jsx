// src/pages/Auth/Register.jsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const schema = z.object({
  name: z.string().min(3, 'Nome obrigatório'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
});

export default function Register() {
  const { register: formRegister, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });
  const { register } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await register(data.name, data.email, data.password);
      toast.success('Conta criada com sucesso!');
      navigate('/');
    } catch (err) {
      toast.error('Erro ao criar conta');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold mb-6 text-center">Criar Conta</h2>
        
        <input {...formRegister('name')} placeholder="Nome completo" className="border p-3 w-full mb-3 rounded-lg" />
        {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name.message}</p>}

        <input {...formRegister('email')} type="email" placeholder="Email" className="border p-3 w-full mb-3 rounded-lg" />
        {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>}

        <input {...formRegister('password')} type="password" placeholder="Senha" className="border p-3 w-full mb-6 rounded-lg" />
        {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>}

        <button type="submit" className="bg-blue-600 text-white p-3 w-full rounded-lg hover:bg-blue-700 font-semibold">
          Criar Conta
        </button>

        <p className="text-center mt-4 text-gray-600">
          Já tem conta? <a href="/login" className="text-blue-600 hover:underline">Entrar</a>
        </p>
      </form>
    </div>
  );
}