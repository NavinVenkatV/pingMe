import z from "zod"

export const EmailSchema = z.object({
    email : z.string().email()
})

export const password = z.object({
    password : z.string().min(8)
})