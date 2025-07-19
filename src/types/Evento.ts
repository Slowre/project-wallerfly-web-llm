import { z } from 'zod'

export const eventoSchema = z.object({
    id: z.string().uuidv4(),
    name: z.string({ message: "Debe ser texto" }).max(20, "Máximo 20 caracteres").min(1, "El nombre es obligatorio"),
    description: z.string().max(100, "Máximo 100 caracteres").optional(),
    amount: z.number().positive("Debe ser un número positivo"),
    date: z.iso.date(),
    type: z.enum(["Egreso", "Ingreso"], {
        error: (_) => `Ingreso invalido`
    }),
})

export type EventoType = z.infer<typeof eventoSchema>

export const eventoCreateSchema = eventoSchema.omit({ id: true })

export type EventoCreate = z.infer<typeof eventoCreateSchema>

export const eventoUpdateSchema = eventoSchema.partial()

export type EventoUpdate = z.infer<typeof eventoUpdateSchema>
