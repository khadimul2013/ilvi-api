import type { HttpContext } from '@adonisjs/core/http'
import Summary from '#models/summary'
import Meeting from '#models/meeting'
import { SUMMERY } from '#helpers/enum'

export default class SummaryController {

    async store({ request, auth, response }: HttpContext) {
        try {
            const user = auth.user!
            const { meetingId } = request.only(['meetingId'])

            const meeting = await Meeting.query()
                .where('uuid', meetingId)
                .where('tenantId', user.tenantId)
                .first()

            if (!meeting) {
                return response.notFound({
                    data: null,
                    message: 'Meeting not found',
                    success: false,
                    status: 404
                })
            }

            const summary = await Summary.create({
                meetingId: meeting.uuid,
                tenantId: user.tenantId,
                status: SUMMERY.PENDING,
            })

            return response.created({
                data: summary,
                message: 'Summary created successfully',
                success: true,
                status: 201,
            })

        } catch (error: any) {
            return response.badRequest({
                data: null,
                message: error.message,
                success: false,
                status: 400,
            })
        }
    }

    async index({ auth, request, response }: HttpContext) {
        try {
            const user = auth.user!

            const page = request.input('page', 1)
            const limit = request.input('limit', 10)

            const summaries = await Summary.query()
                .where('tenantId', user.tenantId)
                .preload('meeting')
                .orderBy('createdAt', 'desc')
                .paginate(page, limit)

            return response.ok({
                data: {
                    items: summaries.all(),
                    meta: summaries.getMeta()
                },
                message: 'Summaries retrieved successfully',
                success: true,
                status: 200,
            })

        } catch (error: any) {
            return response.badRequest({
                data: null,
                message: error.message,
                success: false,
                status: 400,
            })
        }
    }

    async destroy({ params, auth, response }: HttpContext) {
        try {
            const user = auth.user!
            const summaryId = params.id

            const summary = await Summary.query()
                .where('uuid', summaryId)
                .where('tenantId', user.tenantId)
                .first()

            if (!summary) {
                return response.notFound({
                    data: null,
                    message: 'Summary not found',
                    success: false,
                    status: 404,
                })
            }

            await summary.delete()

            return response.ok({
                data: null,
                message: 'Summary deleted successfully',
                success: true,
                status: 200,
            })

        } catch (error: any) {
            return response.badRequest({
                data: null,
                message: error.message,
                success: false,
                status: 400,
            })
        }
    }
}