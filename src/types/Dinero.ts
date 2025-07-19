import { z } from 'zod'
export const dineroSchema = z.object({
    id: z.string().uuidv4(),
    money: z.number().positive("Debe ser un número positivo"),
    
})

export type DineroType = z.infer<typeof dineroSchema>

export const dineroCreateSchema = dineroSchema.omit({ id: true })

export type DineroCreate = z.infer<typeof dineroCreateSchema>

export const dineroUpdateSchema = dineroSchema.partial()

export type DineroUpdate = z.infer<typeof dineroUpdateSchema>