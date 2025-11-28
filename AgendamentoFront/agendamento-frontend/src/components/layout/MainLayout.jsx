import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Home, Calendar, Scissors, User, LogOut } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Dashboard', icon: Home },
  { to: '/appointments', label: 'Agenda', icon: Calendar },
  { to: '/services', label: 'Serviços', icon: Scissors },
  { to: '/profile', label: 'Perfil', icon: User },
];

export default function MainLayout({ children }) {
  const { logout } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">AgendeFácil</h1>
          <button onClick={logout} className="flex items-center gap-2 text-red-600 hover:bg-red-50 px-3 py-2 rounded">
            <LogOut size={18} /> Sair
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md min-h-screen">
          <nav className="mt-6">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-blue-50 ${
                  location.pathname === item.to ? 'bg-blue-100 border-r-4 border-blue-600' : ''
                }`}
              >
                <item.icon size={20} />
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Conteúdo */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}