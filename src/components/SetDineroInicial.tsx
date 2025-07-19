import { cn } from "@/utils/styles"
import { useState } from "react";

type SetDineroInicialProps = {
    dineroInicial: number
    dineroAnadir: (money: number) => void
}



export default function SetDineroInicial(props: SetDineroInicialProps) {
    const [cantidad, setCantidad] = useState(0);


    return (
        <div className='flex gap-4 items-end'>
            <div className='flex flex-col  items-start'>
                <label className=''>Dinero inicial</label>
                <input
                    type="number"
                    value={cantidad}
                    onChange={(e) => setCantidad(Number(e.target.value))}
                    className='h-8 border-1 rounded px-3 bg-white border-gray-300'
                />
            </div>

            <button onClick={() => {
                props.dineroAnadir(cantidad)
                setCantidad(0)
            }} className={cn('bg-violet-600 text-white h-fit rounded px-3 py-2 shadow-xl cursor-pointer hover:bg-violet-700')}>
                Calcular
            </button>
        </div>

    )
}