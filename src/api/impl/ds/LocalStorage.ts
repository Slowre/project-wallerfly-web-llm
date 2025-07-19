import DataDS from "@/api/domain/ds/DataDS";
import { v4 as uuid } from 'uuid'
import type { EventoType, EventoCreate, EventoUpdate } from "@/types/Evento";
import dayjs from "dayjs";
import type { DineroType, DineroCreate, DineroUpdate } from "@/types/Dinero";

class LocalStorage extends DataDS {
    
    private storageKey = 'events'
    private storageMoneyKey = 'money'

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

    async getMoney(): Promise<DineroType > {
        const moneyTmp = JSON.parse(localStorage.getItem(this.storageMoneyKey) || "0")
        if(moneyTmp==0){
            const newMoney: DineroType = { money: 0, id: uuid() }
            localStorage.setItem(this.storageMoneyKey, JSON.stringify(newMoney))
            return newMoney
        }
        return moneyTmp
    }
    async saveMoney(money: DineroCreate): Promise<boolean> {
        const moneys = await this.getMoney()
        
        if (moneys) {
            console.log("Aqui 1")
            const newMoney = { money: moneys.money + money.money, id: moneys.id }
            localStorage.setItem(this.storageMoneyKey, JSON.stringify(newMoney))
        } else {
            console.log("Aqui 2")
            const newMoney: DineroType = { money: 0, id: uuid() }
            localStorage.setItem(this.storageMoneyKey, JSON.stringify(newMoney))
        }
        return true
    }
}
export default LocalStorage