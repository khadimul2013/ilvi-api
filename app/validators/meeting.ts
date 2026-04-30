import vine from '@vinejs/vine'


export const meetingValidator = vine.compile(
    vine.object({
        title: vine.string().trim().minLength(1).maxLength(255).optional(),
        language: vine.string().trim().minLength(2).maxLength(20).optional(),
        status: vine.enum(['PENDING', 'RECORDING', 'UPLOADED', 'PROCESSING', 'COMPLETED', 'FAILED']).optional(),
    })
)

export const uploadAudioValidator = vine.compile(
    vine.object({
        meetingId: vine.string().uuid(),
    })
)
