import vine from "@vinejs/vine";

export const profileValidator = vine.create({
    firstName: vine.string().trim().minLength(1).maxLength(255).optional(),
    lastName: vine.string().trim().maxLength(255).optional(),
    email: vine.string().email().maxLength(254).optional(),
    companyName: vine.string().nullable().optional(),
    locale: vine.string().optional(),
    color: vine.string().optional(),
    phone: vine.string().optional(),
})