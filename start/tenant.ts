import { HttpContext } from '@adonisjs/core/http'

HttpContext.getter('tenantId', function (this: any) {
    return (
        this.request.header('X-Tenant-ID') ||
        this.auth?.user?.tenantId ||
        null
    )
})