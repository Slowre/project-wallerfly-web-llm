import DataRepo from '@/api/datasource'
import { useAppForm } from '@/hooks/form'
import { eventoCreateSchema, type EventoCreate } from '@/types/Evento'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import dayjs from 'dayjs'

export const Route = createFileRoute('/event/form/')({
  component: RouteComponent,
})

const now = dayjs();
now.format('YYYY-MM-DD')

const defaultValues: EventoCreate = {
  name: '',
  description: '',
  amount: 0,
  date: now.format('YYYY-MM-DD'),
  type: 'Ingreso'
}

function RouteComponent() {
  const navigate = useNavigate();

  const form = useAppForm({
    defaultValues, validators: {
      onSubmit: eventoCreateSchema

    },
    onSubmit: ({ value }) => {
      //console.log('Valores del form: ', value)
      mutation.mutate(value)

    },
  })

  const mutation = useMutation<boolean, Error, EventoCreate>({
    mutationKey: ['events'],
    mutationFn: (values) => DataRepo.saveEvent(values),
    onSettled: (_, error) => {
      if (error) {
        alert(`Error al crear evento: ${error.message}`)
      } else {
        navigate({ to: '/' })
      }
    }
  })

  return <>
    <div className='flex justify-center w-full'>

      <form className='flex flex-col gap-4 w-full' onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}>
        <h2 className='dark:text-gray-300'>Crear evento</h2>
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
            text='Registrar evento'
            type='submit'
            className='mt-4 w-full bg-violet-500 hover:bg-violet-700 text-white font-semibold py-2 px-4 rounded uppercase dark:bg-pink-500 dark:hover:bg-pink-700'
          />
        </form.AppForm>


      </form>

    </div>


  </>

}
