import type { EventoType } from "@/types/Evento"
import { cn } from "@/utils/styles"

type EventProps = {
    event: EventoType
}

export default function Event({ event }: EventProps) {
    return (
        <>
            <div className="p-2 flex flex-row justify-between">
                <div className="flex flex-col items-start">
                    <span className="text-sm text-gray-700">{event.name}</span>
                    <span className="text-xs text-gray-500">{event.date}</span>
                </div>
                <div className={cn("text-sm", event.type == "Ingreso" ? 'text-green-700' : 'text-red-400')}>
                    {'$' + event.amount}
                </div>
            </div>
            <div className="w-full border-1 border-gray-200"></div>
        </>
    )
}