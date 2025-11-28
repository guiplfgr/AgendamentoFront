// src/pages/Dashboard.jsx
import { useAppointments } from '../services/appointments';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export default function Dashboard() {
  const { data: appointments = [] } = useAppointments();

  const events = appointments.map(app => ({
    title: app.service?.name || 'Agendamento',
    start: new Date(app.date),
    end: new Date(new Date(app.date).getTime() + (app.service?.duration || 60) * 60000),
  }));

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">Dashboard</h1>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          messages={{
            next: "Próximo",
            previous: "Anterior",
            today: "Hoje",
            month: "Mês",
            week: "Semana",
            day: "Dia",
          }}
        />
      </div>
    </div>
  );
}