import { createFileRoute, Link } from '@tanstack/react-router'
import '../App.css'
import { cn } from '@/utils/styles'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import DataRepo from '@/api/datasource';
import MonthsResumen from '@/components/MonthResumen';
import type { EventoCreate, EventoType } from '@/types/Evento';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/es'
import SetDineroInicial from '@/components/SetDineroInicial';

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  dayjs.locale("es");
  const [dineroInicial, setDineroInicial] = useState(0);
  const [eventosAgrupados, setEventosAgrupados] = useState<[string, EventoType[]][]>([]);
  const queryClient = useQueryClient();
 
  const { isPending, error, data: events } = useQuery({
    queryKey: ['events'],
    queryFn: () => DataRepo.getEvents(),
    refetchInterval: 2000, // Refetch every 2 seconds
    refetchOnWindowFocus: true, // Refetch when the window is focused
    retry: 3, // Retry failed requests up to 3 times
    refetchIntervalInBackground: false, // Do not refetch in the background
  })

  useEffect(() => {
    if (events) {
      const eventsOrdenados = [...events].sort(
        (a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf()
      )
      const agrupados: Record<string, EventoType[]> = {}
      eventsOrdenados.forEach(evento => {
        const key = dayjs(evento.date).format('MMMM YYYY')
        if (!agrupados[key]) agrupados[key] = []
        agrupados[key].push(evento)
      })
      const resultado = Object.entries(agrupados)
      setEventosAgrupados(resultado)
    }
  }, [events])

  if (isPending) {
    return <div className="p-4">Loading...</div>
  }
  if (error) {
    return <div className="p-4 text-red-500">Error: {error.message}</div>
  }

  const deleteEvent = async (id: string) => {
    try {
      await DataRepo.deleteEvent(id)
      queryClient.invalidateQueries({ queryKey: ['events'] })
    } catch (error) {
      alert("Error eliminando evento")
    }
  }


  return (
    <div className="App">
      {/* <Header /> */}
      <div className='flex justify-between items-end'>
        <SetDineroInicial
        dineroInicial={dineroInicial}
        setDineroInicial={setDineroInicial}
        />

        <Link
          to='/event/form'
          className={cn('bg-violet-600 text-white h-fit rounded px-3 py-2 shadow-xl hover:bg-violet-700')}
        >
          Add Event
        </Link>
      </div>
      <div className="p-4">
        <div className="flex flex-row g-0 flex-wrap">
          {eventosAgrupados.length != 0 && eventosAgrupados.map((item, indice) => (
            <MonthsResumen key={indice} date={item[0]} events={item[1]} />
          ))}
          {eventosAgrupados.length == 0 && <div className="text-center text-gray-500">No hay eventos</div>}

        </div>
      </div>
    </div>
  )
}
