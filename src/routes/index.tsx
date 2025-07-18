import { createFileRoute, Link } from '@tanstack/react-router'
import '../App.css'
import { cn } from '@/utils/styles'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      <div className='flex justify-between px-11 py-8 items-end'>
        <div className='flex gap-4 items-end'>
          <div className='flex flex-col  items-start'>
            <label className=''>Dinero inicial</label>
            <input type="text" value={0} className='h-8 border-1 rounded px-3 bg-white border-gray-300' />
          </div>

          <button className={cn('bg-violet-600 text-white h-fit rounded px-3 py-2 shadow-xl cursor-pointer hover:bg-violet-700')}>
            Calcular
          </button>
        </div>

        <Link
          to='/event/form'
          className={cn('bg-violet-600 text-white h-fit rounded px-3 py-2 shadow-xl hover:bg-violet-700')}
        >
          Add Event
        </Link>
      </div>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/routes/index.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <a
          className="App-link"
          href="https://tanstack.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn TanStack
        </a>
      </header> */}
    </div>
  )
}
