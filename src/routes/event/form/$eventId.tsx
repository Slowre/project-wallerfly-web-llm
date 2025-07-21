import DataRepo from '@/api/datasource'
import { useAppForm } from '@/hooks/form'
import { eventoCreateSchema, type EventoCreate } from '@/types/Evento'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/event/form/$eventId')({
  component: RouteComponent,
})

const now = dayjs();
now.format('YYYY-MM-DD')


function RouteComponent() {
  const { eventId } = Route.useParams()
  const navigate = useNavigate();
  const [mode] = useState<'create' | 'update'>(
    eventId ? 'update' : 'create',
  )

  const [defaultValues, setDefaultValues] = useState<EventoCreate>({
    name: '',
    description: '',
    amount: 0,
    date: now.format('YYYY-MM-DD'),
    type: 'Ingreso'
  })

  const { data } = useQuery({
    enabled: mode === 'update',
    queryKey: ['event', eventId],
    queryFn: () => DataRepo.getEventById(eventId),
  })

  const form = useAppForm({
    defaultValues
    , validators: {
      onSubmit: eventoCreateSchema

    },
    onSubmit: ({ value }) => {
      mutation.mutate(value)

    }
  })

  const mutation = useMutation<boolean, Error, EventoCreate>({
    mutationKey: ['events'],
    mutationFn: (values) => {
      if (mode === 'create') {
        return DataRepo.saveEvent(values)
      } else {
        return DataRepo.updateEvent({
          ...values,
          id: eventId,
        })
      }

    },
    onSettled: (_, error) => {
      if (error) {
        alert(`Error al almacenar evento: ${error.message}`)
      } else {
        if (mode === 'create') {
          alert('Evento creado satisfactoriamente!')
        }
        if (mode === 'update') {
          alert('Evento actualizado satisfactoriamente!')
        }
        navigate({ to: '/' })
      }
    }
  })

  useEffect(
    () => {
     console.log(mode)
      if (data) {
         
        setDefaultValues({
          name: data.name,
          description: data.description,
          amount: data.amount,
          date: dayjs(data.date).format('YYYY-MM-DD'),
          type: data.type
        })
      }
    },
    [data]
  )

  return <>
    <div className='flex justify-center w-full'>

      <form className='flex flex-col gap-4 w-full' onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}>
        <h2>Crear evento</h2>
        <form.AppField
          name='name'
          children={(field) => (
            <field.Input
              type='text'
              label='Nombre'
              placeholder='Nombre del evento'
              className='w-full'
              value={field.state.value}
              error={field.state.meta.errors.map((e) => e?.message).join(', ')}
              onChange={(e) => field.setValue(e.target.value)}
            />
          )}
        />
        <form.AppField
          name='description'
          children={(field) => (
            <field.Input
              type='text'
              label='Descripción'
              placeholder='Descripción del evento'
              className='w-full'
              value={field.state.value}
              error={field.state.meta.errors.map((e) => e?.message).join(', ')}
              onChange={(e) => field.setValue(e.target.value)}
            />
          )}
        />
        <form.AppField
          name='date'
          children={(field) => (
            <field.Input
              type='date'
              label='Fecha'
              className='w-full justify-between'
              value={field.state.value as EventoCreate['date']}
              error={field.state.meta.errors.map((e) => e?.message).join(', ')}
              onChange={(e) => field.setValue(e.target.value as EventoCreate['date'])}
            />
          )}
        />


        <form.AppField
          name='amount'
          children={(field) => (
            <field.Input
              type='number'
              label='Monto'
              className='w-full'
              value={field.state.value}
              error={field.state.meta.errors.map((e) => e?.message).join(', ')}
              onChange={(e) => field.setValue(+e.target.value)}
            />
          )}
        />
        <form.AppField
          name='type'
          children={(field) => (
            <field.Select
              label='Tipo'
              className='w-full '
              options={[
                { label: 'Ingreso', value: 'Ingreso' },
                { label: 'Egreso', value: 'Egreso' }
              ]}
              value={field.state.value}
              onChange={(e) => field.setValue(e.target.value as EventoCreate['type'])}

              error={field.state.meta.errors.map((e) => e?.message).join(', ')}
            />
          )}
        />
        <form.AppForm>

          <form.SubmitButton
            text={(mode === 'create' ? 'Crear' : 'Actualizar') + ' Evento'}
            type='submit'
            className='mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded'
          />
        </form.AppForm>


      </form>

    </div>


  </>

}
