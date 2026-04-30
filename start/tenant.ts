import { HttpContext } from '@adonisjs/core/http'

declare module '@adonisjs/core/http' {
  interface HttpContext {
    tenantId: string | null
  }
}

HttpContext.getter('tenantId', function (this: HttpContext) {
  return this.request.header('X-Tenant-ID') || this.auth?.user?.tenantId || null
})
