import { cn } from "@/utils/styles"

type SetDineroInicialProps = {
    dineroInicial: number
    setDineroInicial: React.Dispatch<React.SetStateAction<number>>
}



export default function SetDineroInicial(props: SetDineroInicialProps) {
    return (
        <div className='flex gap-4 items-end'>
            <div className='flex flex-col  items-start'>
                <label className=''>Dinero inicial</label>
                <input
                    type="number"
                    value={props.dineroInicial}
                    onChange={(e) => props.setDineroInicial(Number(e.target.value))}
                    className='h-8 border-1 rounded px-3 bg-white border-gray-300'
                />
            </div>

            <button className={cn('bg-violet-600 text-white h-fit rounded px-3 py-2 shadow-xl cursor-pointer hover:bg-violet-700')}>
                Calcular
            </button>
        </div>

    )
}