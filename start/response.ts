// import type { Response as HttpResponse } from '@adonisjs/core/http'

// import { HttpResponse } from '@adonisjs/core/http'

// HttpResponse.macro('myok', function (this: HttpResponse, data?: any, message?: string): HttpResponse {
//   return this.status(200),this.json({)
// })

// HttpResponse.macro('created', function (this: HttpResponse, data: any = {}, message: string = '') {
//     return this.status(201).send({
//         data,
//         message,
//         status: 201,
//         success: true,
//     })
// })

// HttpResponse.macro('unauthorized', function (this: HttpResponse, message: string = '') {
//     return this.status(401).send({
//         data: null,
//         message,
//         status: 401,
//         success: false,
//     })
// })

// HttpResponse.macro('bad', function (this: HttpResponse, message: string = '') {
//     return this.status(400).send({
//         data: null,
//         message,
//         status: 400,
//         success: false,
//     })
// })

// HttpResponse.macro('error', function (this: HttpResponse, message: string = '') {
//     return this.status(500).send({
//         data: null,
//         message,
//         status: 500,
//         success: false,
//     })
// })

// HttpResponse.macro('forbidden', function (this: HttpResponse, message: string = '') {
//     return this.status(403).send({
//         data: null,
//         message,
//         status: 403,
//         success: false,
//     })
// })

// HttpResponse.macro('unProcessableEntity', function (this: HttpResponse, messages: any = {}) {
//     return this.status(422).send({
//         data: null,
//         messages,
//         status: 422,
//         success: false,
//     })
// })
