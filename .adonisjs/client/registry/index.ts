/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.auth.signup': {
    methods: ["POST"],
    pattern: '/api/v1/auth/signup',
    tokens: [{"old":"/api/v1/auth/signup","type":0,"val":"api","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['auth.auth.signup']['types'],
  },
  'auth.auth.signin': {
    methods: ["POST"],
    pattern: '/api/v1/auth/login',
    tokens: [{"old":"/api/v1/auth/login","type":0,"val":"api","end":""},{"old":"/api/v1/auth/login","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/login","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.auth.signin']['types'],
  },
  'auth.auth.forgot_password': {
    methods: ["POST"],
    pattern: '/api/v1/auth/forgot-password',
    tokens: [{"old":"/api/v1/auth/forgot-password","type":0,"val":"api","end":""},{"old":"/api/v1/auth/forgot-password","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/forgot-password","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/forgot-password","type":0,"val":"forgot-password","end":""}],
    types: placeholder as Registry['auth.auth.forgot_password']['types'],
  },
  'auth.auth.reset_password': {
    methods: ["POST"],
    pattern: '/api/v1/auth/reset-password',
    tokens: [{"old":"/api/v1/auth/reset-password","type":0,"val":"api","end":""},{"old":"/api/v1/auth/reset-password","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/reset-password","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/reset-password","type":0,"val":"reset-password","end":""}],
    types: placeholder as Registry['auth.auth.reset_password']['types'],
  },
  'auth.destroy': {
    methods: ["POST"],
    pattern: '/api/v1/auth/logout',
    tokens: [{"old":"/api/v1/auth/logout","type":0,"val":"api","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['auth.destroy']['types'],
  },
  'auth.change_password': {
    methods: ["POST"],
    pattern: '/api/v1/auth/change-password',
    tokens: [{"old":"/api/v1/auth/change-password","type":0,"val":"api","end":""},{"old":"/api/v1/auth/change-password","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/change-password","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/change-password","type":0,"val":"change-password","end":""}],
    types: placeholder as Registry['auth.change_password']['types'],
  },
  'profile.profile.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/account/profile',
    tokens: [{"old":"/api/v1/account/profile","type":0,"val":"api","end":""},{"old":"/api/v1/account/profile","type":0,"val":"v1","end":""},{"old":"/api/v1/account/profile","type":0,"val":"account","end":""},{"old":"/api/v1/account/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.profile.show']['types'],
  },
  'meetings.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/meetings',
    tokens: [{"old":"/api/v1/meetings","type":0,"val":"api","end":""},{"old":"/api/v1/meetings","type":0,"val":"v1","end":""},{"old":"/api/v1/meetings","type":0,"val":"meetings","end":""}],
    types: placeholder as Registry['meetings.index']['types'],
  },
  'meetings.store': {
    methods: ["POST"],
    pattern: '/api/v1/meetings',
    tokens: [{"old":"/api/v1/meetings","type":0,"val":"api","end":""},{"old":"/api/v1/meetings","type":0,"val":"v1","end":""},{"old":"/api/v1/meetings","type":0,"val":"meetings","end":""}],
    types: placeholder as Registry['meetings.store']['types'],
  },
  'meetings.update': {
    methods: ["PUT","PATCH"],
    pattern: '/api/v1/meetings/:id',
    tokens: [{"old":"/api/v1/meetings/:id","type":0,"val":"api","end":""},{"old":"/api/v1/meetings/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/meetings/:id","type":0,"val":"meetings","end":""},{"old":"/api/v1/meetings/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['meetings.update']['types'],
  },
  'meeting.upload_audio': {
    methods: ["POST"],
    pattern: '/api/v1/meetings/:id/uploads',
    tokens: [{"old":"/api/v1/meetings/:id/uploads","type":0,"val":"api","end":""},{"old":"/api/v1/meetings/:id/uploads","type":0,"val":"v1","end":""},{"old":"/api/v1/meetings/:id/uploads","type":0,"val":"meetings","end":""},{"old":"/api/v1/meetings/:id/uploads","type":1,"val":"id","end":""},{"old":"/api/v1/meetings/:id/uploads","type":0,"val":"uploads","end":""}],
    types: placeholder as Registry['meeting.upload_audio']['types'],
  },
  'uploads.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/uploads',
    tokens: [{"old":"/api/v1/uploads","type":0,"val":"api","end":""},{"old":"/api/v1/uploads","type":0,"val":"v1","end":""},{"old":"/api/v1/uploads","type":0,"val":"uploads","end":""}],
    types: placeholder as Registry['uploads.index']['types'],
  },
  'uploads.store': {
    methods: ["POST"],
    pattern: '/api/v1/uploads',
    tokens: [{"old":"/api/v1/uploads","type":0,"val":"api","end":""},{"old":"/api/v1/uploads","type":0,"val":"v1","end":""},{"old":"/api/v1/uploads","type":0,"val":"uploads","end":""}],
    types: placeholder as Registry['uploads.store']['types'],
  },
  'uploads.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/uploads/:id',
    tokens: [{"old":"/api/v1/uploads/:id","type":0,"val":"api","end":""},{"old":"/api/v1/uploads/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/uploads/:id","type":0,"val":"uploads","end":""},{"old":"/api/v1/uploads/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['uploads.destroy']['types'],
  },
  'transcriptions.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/transcriptions',
    tokens: [{"old":"/api/v1/transcriptions","type":0,"val":"api","end":""},{"old":"/api/v1/transcriptions","type":0,"val":"v1","end":""},{"old":"/api/v1/transcriptions","type":0,"val":"transcriptions","end":""}],
    types: placeholder as Registry['transcriptions.index']['types'],
  },
  'transcriptions.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/transcriptions/:id',
    tokens: [{"old":"/api/v1/transcriptions/:id","type":0,"val":"api","end":""},{"old":"/api/v1/transcriptions/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/transcriptions/:id","type":0,"val":"transcriptions","end":""},{"old":"/api/v1/transcriptions/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['transcriptions.show']['types'],
  },
  'transcriptions.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/transcriptions/:id',
    tokens: [{"old":"/api/v1/transcriptions/:id","type":0,"val":"api","end":""},{"old":"/api/v1/transcriptions/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/transcriptions/:id","type":0,"val":"transcriptions","end":""},{"old":"/api/v1/transcriptions/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['transcriptions.destroy']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
