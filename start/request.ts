import { HttpRequest } from '@adonisjs/core/http'

declare module '@adonisjs/core/http' {
  interface HttpRequest {
    getTenantId(): string | null
  }
}

HttpRequest.macro('getTenantId', function (this: HttpRequest) {
  return this.header('X-Tenant-ID') || this.ctx?.auth?.user?.tenantId || null
})
