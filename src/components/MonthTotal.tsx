import type { EventoType } from "@/types/Evento"
import { useEffect, useState } from "react"

type MonthTotalProps = {
    events: EventoType[]
    total:number
}
export default function MonthTotal(props: MonthTotalProps) {
    const [ingresos, setIngresos] = useState(0)
    const [gastos, setGastos] = useState(0)

    useEffect(() => {
        const totalIngresos = props.events.reduce(
            (acu, item) => {
                if (item.type === 'Ingreso') {
                    return acu + item.amount
                }
                return acu
            },
            0,
        )
        const totalGastos = props.events.reduce(
            (acu, item) => {
                if (item.type === 'Egreso') {
                    return acu + item.amount
                }
                return acu
            },
            0,
        )

        setIngresos(totalIngresos)
        setGastos(totalGastos)
    }, [props.events])

    return (
        <div className="bg-gray-100 dark:bg-gray-500 rounded-md ">
            <div className="flex flex-row justify-between px-2">
                <p className="font-semibold text-gray-700 dark:text-gray-300">
                    Ingresos
                </p>
                <p className=" text-gray-700 dark:text-gray-300">$ {
                    ingresos
                }</p>
            </div>
            <div className="flex flex-row justify-between px-2">
                <p className="font-semibold text-gray-700 dark:text-gray-300">Egresos</p>
                <p className=" text-gray-700 dark:text-gray-300">$
                    {
                        gastos
                    }
                </p>
            </div>
            <div className="flex flex-row justify-between px-2">
                <p className="font-semibold text-gray-700 dark:text-gray-300">Mensual</p>
                <p className=" text-gray-700 dark:text-gray-300">${ingresos - gastos}</p>
            </div>
            <div className="flex flex-row justify-between px-2">
                <p className="font-semibold text-gray-700 dark:text-gray-300">Global</p>
                <p className=" text-gray-700 dark:text-gray-300">${props.total}</p>
            </div>
        </div>

    )
}