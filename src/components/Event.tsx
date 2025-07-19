import type { EventoType } from "@/types/Evento"
import { cn } from "@/utils/styles"
import dayjs from "dayjs"
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'

type EventProps = {
    event: EventoType
}

export default function Event({ event }: EventProps) {
    const fecha = dayjs(event.date).format('DD/MM/YYYY')

    const attrTooltip = event.description && event.description.length !== 0
        ? { 'data-tooltip-content': event.description }
        : {}
    return (
        <div data-tooltip-id="event-description"
            {...attrTooltip}

            data-tooltip-place="top">
            <div className="p-2 flex flex-row justify-between hover:bg-gray-200 rounded-md m-2">
                <div className="flex flex-col items-start">
                    <span className="text-sm text-gray-700">{event.name}</span>
                    <span className="text-xs text-gray-500">{fecha}</span>
                </div>
                <div className={cn("text-sm", event.type == "Ingreso" ? 'text-green-700' : 'text-red-400')}>
                    {'$' + event.amount}
                </div>
            </div>
            <div className="w-full border-1 border-gray-200"></div>
            <Tooltip id="event-description" />
        </div>
    )
}