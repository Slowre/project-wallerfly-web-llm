import { z } from 'zod'

export const eventoSchema = z.object({
    id: z.string().uuidv4(),
    nombre: z.string({ message: "Debe ser texto" }).max(20, "Máximo 20 caracteres").min(1, "El nombre es obligatorio"),
    descripcion: z.string().max(100, "Máximo 100 caracteres").optional(),
    cantidad: z.number().positive("Debe ser un número positivo"),
    fecha: z.date({
        error: issue => issue.input === undefined ? "Required" : "Invalid date"
    }),
    tipo: z.enum(["egreso", "ingreso"], {
        error: (_) => `Ingreso invalido`
    }),
})

export type EventoType = z.infer<typeof eventoSchema>

export const eventoCreateSchema = eventoSchema.omit({ id: true })

export type EventoCreate = z.infer<typeof eventoCreateSchema>

export const eventoUpdateSchema = eventoSchema.partial()

export type EventoUpdate = z.infer<typeof eventoUpdateSchema>
