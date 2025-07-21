import type { DineroCreate, DineroType } from "@/types/Dinero";
import type { EventoCreate, EventoType, EventoUpdate } from "@/types/Evento";

abstract class DataDS {
    abstract getEvents(): Promise<Array<EventoType>>
    abstract getEventById(id: string): Promise<EventoType>
    abstract saveEvent(event: EventoCreate): Promise<boolean>
    abstract updateEvent(event: EventoUpdate): Promise<boolean>
    abstract deleteEvent(id: string): Promise<boolean>

    abstract getMoney():Promise<DineroType>
    abstract saveMoney(money: DineroCreate): Promise<boolean>
}

export default DataDS;