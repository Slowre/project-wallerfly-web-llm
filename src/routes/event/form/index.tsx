import Input from '@/components/form/input'
import { useAppForm } from '@/hooks/form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/event/form/')({
  component: RouteComponent,
})

function RouteComponent() {

  const form = useAppForm({
    defaultValues: {
      name: '',
      description: '',
      date: '',
      amount: 0,
      type: 'ingreso'
    }
  })
  return <>
    <div className='px-16 pt-24'>

      <form className='flex flex-col gap-4 max-w-2xl' onSubmit={(e) => {
        e.preventDefault()
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
            />
          )}
        />
        <form.AppField
          name='date'
          children={(field) => (
            <field.Input
              type='date'
              label='Fecha'
              className='w-full'
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
            />
          )}
        />
        <form.AppField
          name='type'
          children={(field) => (
            <field.Select
              label='Tipo'
              className='w-full justify-between'
              options={[
                { label: 'Ingreso', value: 'ingreso' },
                { label: 'Egreso', value: 'egreso' }
              ]}
            />
          )}
        />
        <form.AppForm>

          <form.SubmitButton
            text='Enviar'
            type='submit'
            className='mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded'
          />
        </form.AppForm>


      </form>

    </div>


  </>
}
