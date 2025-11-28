import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';
import { useAppointments } from '../services/appointments'; // Crie o hook similar ao de services

const localizer = {
  format: (date, format) => dayjs(date).format(format),
  parse: (value, format) => dayjs(value, format).toDate(),
  startOfWeek: () => dayjs().startOf('week').toDate(),
  getDay: (date) => dayjs(date).day(),
  date: (date) => dayjs(date).toDate(),
};

export default function Dashboard() {
  const { data: appointments } = useAppointments(); // Fetch agendamentos

  const events = appointments?.map(app => ({
    title: app.service.name,
    start: new Date(app.date),
    end: dayjs(app.date).add(app.service.duration, 'minute').toDate(),
  })) || [];

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-4">Dashboard</h1>
      <Calendar localizer={localizer} events={events} startAccessor="start" endAccessor="end" style={{ height: 500 }} />
    </div>
  );
}