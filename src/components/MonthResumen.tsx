import type { EventoType } from "@/types/Evento"
import type { Dayjs } from "dayjs"
import Event from "./event"
import 'dayjs/locale/es';
import MonthTotal from "./MonthTotal";

type MonthsResumenProps = {
    date: string
    events: EventoType[]
}
export default function MonthsResumen(props: MonthsResumenProps) {
    const { date, events } = props

    return (
        <article className="p-4">
            <div className="bg-white rounded-md shadow-lg w-[300px]">
                <div className="flex flex-col gap-2">
                    <div>
                        <h3 className="text-gray-800 font-semibold text-lg">{date}</h3>
                        <div className="w-full border-1 border-gray-200"></div>
                        <div className="p-2">
                            {events.map((event) => (
                                <Event
                                    key={event.id}
                                    event={event}
                                />

                            ))}
                        </div>
                        <div className="p-2">
                            <MonthTotal
                                events={events}
                            />

                        </div>

                    </div>
                    <div></div>
                </div>
            </div>
        </article>
    )
}