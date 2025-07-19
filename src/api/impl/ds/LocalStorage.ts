import DataDS from "@/api/domain/ds/DataDS";
import { v4 as uuid } from 'uuid'
import type { EventoType, EventoCreate, EventoUpdate } from "@/types/Evento";
import dayjs from "dayjs";

class LocalStorage extends DataDS {
    private storageKey = 'events'

    static instance: LocalStorage

    private constructor() {
        super()
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new LocalStorage()
        }
        return this.instance
    }

    async getEvents(): Promise<Array<EventoType>> {
        const events = JSON.parse(localStorage.getItem(this.storageKey) || "[]")      
        return events
    }
    async getEventById(id: string): Promise<EventoType> {
        const events = await this.getEvents()
        const event = events.find((event: EventoType) => event.id == id)

        if (!event)
            throw new Error('Evento con id ' + id + ' no encontrado')

        return event
    }
    async saveEvent(event: EventoCreate): Promise<boolean> {
        const events = await this.getEvents()
        const newEvent: EventoType = { ...event, id: uuid() }
        events.push(newEvent)
        localStorage.setItem(this.storageKey, JSON.stringify(events))
        return true
    }
    async updateEvent(event: EventoUpdate): Promise<boolean> {
        const events = await this.getEvents()
        const index = events.findIndex((e) => e.id == event.id)
        if (index == -1) return false

        events[index] = { ...events[index], ...event }
        localStorage.setItem(this.storageKey, JSON.stringify(events))
        return true
    }
    async deleteEvent(id: string): Promise<boolean> {
        const events = await this.getEvents()
        const index = events.findIndex((e) => e.id == id)
        if (index == -1) return false

        events.splice(index, 1)
        localStorage.setItem(this.storageKey, JSON.stringify(events))
        return true
    }
}
export default LocalStorage