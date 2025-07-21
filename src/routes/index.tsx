import { createFileRoute, Link } from '@tanstack/react-router'
import '../App.css'
import { cn } from '@/utils/styles'
import { useMutation, useQuery } from '@tanstack/react-query';
import DataRepo from '@/api/datasource';
import MonthsResumen from '@/components/MonthResumen';
import type { EventoType } from '@/types/Evento';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/es'
import SetDineroInicial from '@/components/SetDineroInicial';
import type { DineroCreate } from '@/types/Dinero';

export const Route = createFileRoute('/')({
  component: App,
})

type AgrupacionMensual = {
  mes: string;
  eventos: EventoType[];
  total: number;
};

function App() {
  dayjs.locale("es");
  const [dineroInicial, setDineroInicial] = useState(0);
  // const [eventosAgrupados, setEventosAgrupados] = useState<[string, EventoType[]][]>([]);


  const [eventosAgrupados, setEventosAgrupados] = useState<AgrupacionMensual[]>([]);


  const { isPending, error, data: events } = useQuery({
    queryKey: ['events'],
    queryFn: () => DataRepo.getEvents(),
    refetchInterval: 2000, // Refetch every 2 seconds
    refetchOnWindowFocus: true, // Refetch when the window is focused
    retry: 3, // Retry failed requests up to 3 times
    refetchIntervalInBackground: false, // Do not refetch in the background
  })

  const { data: dinero } = useQuery({
    queryKey: ['money'],
    queryFn: () => DataRepo.getMoney(),
    refetchInterval: 2000, // Refetch every 2 seconds
    refetchOnWindowFocus: true, // Refetch when the window is focused
    retry: 3, // Retry failed requests up to 3 times
    refetchIntervalInBackground: false, // Do not refetch in the background
  })

  const mutation = useMutation({
    mutationFn: (values: DineroCreate) => DataRepo.saveMoney(values),
  })

  useEffect(() => {
    if (events && dineroInicial) {
      const eventsOrdenados = [...events].sort(
        (a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf()
      );

      const agrupados: Record<string, EventoType[]> = {};

      eventsOrdenados.forEach((evento) => {
        const key = dayjs(evento.date).format('MMMM YYYY');
        if (!agrupados[key]) agrupados[key] = [];
        agrupados[key].push(evento);
      });

      const resultado: AgrupacionMensual[] = [];

      let saldoActual = dineroInicial;

      Object.entries(agrupados).forEach(([mes, eventos]) => {
        const totalMes = eventos.reduce((acc, evento) => {
          return acc + (evento.type === 'Ingreso' ? evento.amount : -evento.amount);
        }, 0);

        const saldoInicial = saldoActual;
        const saldoFinal = saldoInicial + totalMes;
        saldoActual = saldoFinal

        resultado.push({
          mes,
          eventos,
          total: saldoFinal
        });
      });
      resultado.reverse()
      setEventosAgrupados(resultado);
    }
  }, [events, dineroInicial])

  useEffect(() => {
    if (dinero) {
      setDineroInicial(dinero.money)
    }
  }, [dinero])

  if (isPending) {
    return <div className="p-4">Loading...</div>
  }
  if (error) {
    return <div className="p-4 text-red-500">Error: {error.message}</div>
  }



  const aumentarDinero = (cantidad: number) => {
    const nuevoDinero: DineroCreate = { money: cantidad }
    mutation.mutate(nuevoDinero)
  }

  return (
    <div className="App">
      <div className='flex flex-col md:flex-row justify-between items-start md:items-end gap-4'>
        <SetDineroInicial
          dineroInicial={dineroInicial}
          dineroAnadir={aumentarDinero}
        />

        <div className='w-full text-2xl text-gray-700 font-bold text-center'>
          Su Monto Inicial: <span className="text-violet-500">{dineroInicial}</span>
        </div>

        <Link
          to='/event/form'
          className={cn('bg-violet-600 w-full text-white h-fit rounded px-3 py-2 shadow-xl hover:bg-violet-700 md:w-64')}
        >
          Add Event
        </Link>
      </div>
      <div className="p-4">
        <div className="flex flex-row flex-wrap items-stretch justify-center">
          {eventosAgrupados.length != 0 && eventosAgrupados.map((item, indice) => (
            <MonthsResumen key={indice} date={item.mes} events={item.eventos} total={item.total} />
          ))}
          {eventosAgrupados.length == 0 && <div className="text-center text-gray-500">No hay eventos</div>}

        </div>
      </div>
    </div>
  )
}
