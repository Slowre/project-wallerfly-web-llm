import type DataDS from "@/api/domain/ds/DataDS";
import type { EventoCreate, EventoType } from "@/types/Evento";

class DataRepoImpl {
    private db: DataDS

    constructor(_db: DataDS) {
        this.db = _db
    }

    async getEvents() {
        return this.db.getEvents()
    }

    async getEventById(id: string) {
        return this.db.getEventById(id)
    }

    async saveEvent(event:EventoCreate){
        return this.db.saveEvent(event)
    }

    async updateEvent(event: EventoType) {
        return this.db.updateEvent(event)
    }

    async deleteEvent(id: string) {
        return this.db.deleteEvent(id)
    }


}

export default DataRepoImpl