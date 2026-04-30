import vine from '@vinejs/vine'


export const meetingValidator = vine.compile(
    vine.object({
        title: vine.string().trim().minLength(3).maxLength(255),
        description: vine.string().trim().optional(),
        scheduledAt: vine.string().trim(),
        status: vine.enum(['SCHEDULED', 'ONGOING', 'COMPLETED']).optional(),
        recordingId: vine.string().uuid().optional(),
        transcriptionId: vine.string().uuid().optional(),
    })
)

export const uploadAudioValidator = vine.compile(
    vine.object({
        recordingId: vine.string().uuid(),
    })
)