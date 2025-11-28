import { useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useAppointments } from '../services/appointments';
import toast from 'react-hot-toast';

const localizer = momentLocalizer(moment);

export default function Appointments() {
  const { data: appointments = [] } = useAppointments();
  const [view, setView] = useState(Views.MONTH);

  const events = appointments.map(app => ({
    id: app._id,
    title: `${app.service?.name || 'Serviço'} - ${app.user?.name || 'Cliente'}`,
    start: new Date(app.date),
    end: new Date(new Date(app.date).getTime() + (app.service?.duration || 60) * 60000),
    resource: app,
    allDay: false,
  }));

  const handleSelectEvent = (event) => {
    const status = prompt(`Status atual: ${event.resource.status}\nDigite: confirmed ou cancelled`, event.resource.status);
    if (status && ['confirmed', 'cancelled'].includes(status)) {
      // Aqui você criaria um mutation para atualizar o status
      toast.success(`Agendamento ${status}!`);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Agenda</h1>
      
      <div className="bg-white rounded-lg shadow">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 700 }}
          view={view}
          onView={(newView) => setView(newView)}
          views={[Views.MONTH, Views.WEEK, Views.DAY]}
          messages={{
            next: "Próximo",
            previous: "Anterior",
            today: "Hoje",
            month: "Mês",
            week: "Semana",
            day: "Dia",
          }}
          onSelectEvent={handleSelectEvent}
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: event.resource.status === 'confirmed' ? '#10b981' : 
                               event.resource.status === 'cancelled' ? '#ef4444' : '#3b82f6',
            },
          })}
        />
      </div>
    </div>
  );
}