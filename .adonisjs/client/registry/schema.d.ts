/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'auth.auth.signup': {
    methods: ["POST"]
    pattern: '/api/v1/auth/signup'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').signupValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').signupValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['signup']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['signup']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.auth.signin': {
    methods: ["POST"]
    pattern: '/api/v1/auth/login'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').loginValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').loginValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['signin']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['signin']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.auth.forgot_password': {
    methods: ["POST"]
    pattern: '/api/v1/auth/forgot-password'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').forgotPasswordValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').forgotPasswordValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['forgotPassword']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['forgotPassword']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.auth.reset_password': {
    methods: ["POST"]
    pattern: '/api/v1/auth/reset-password'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').resetPasswordValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').resetPasswordValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['resetPassword']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['resetPassword']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.destroy': {
    methods: ["POST"]
    pattern: '/api/v1/auth/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['destroy']>>>
    }
  }
  'auth.change_password': {
    methods: ["POST"]
    pattern: '/api/v1/auth/change-password'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').changePasswordValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').changePasswordValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['changePassword']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['changePassword']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'profile.profile.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/account/profile'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['show']>>>
    }
  }
  'meeting.store': {
    methods: ["POST"]
    pattern: '/api/v1/meetings'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/meeting').meetingValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/meeting').meetingValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/meeting_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/meeting_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'meeting.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/meetings'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/meeting_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/meeting_controller').default['index']>>>
    }
  }
  'meeting.update': {
    methods: ["PUT"]
    pattern: '/api/v1/meetings/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/meeting').meetingValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/meeting').meetingValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/meeting_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/meeting_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'meeting.upload_audio': {
    methods: ["POST"]
    pattern: '/api/v1/meetings/upload'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/meeting').uploadAudioValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/meeting').uploadAudioValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/meeting_controller').default['uploadAudio']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/meeting_controller').default['uploadAudio']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'recordings.store': {
    methods: ["POST"]
    pattern: '/api/v1/recordings'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/recordings_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/recordings_controller').default['store']>>>
    }
  }
  'recordings.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/recordings'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/recordings_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/recordings_controller').default['index']>>>
    }
  }
  'recordings.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/recordings/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/recordings_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/recordings_controller').default['destroy']>>>
    }
  }
  'transcriptions.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/transcriptions'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/transcriptions_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/transcriptions_controller').default['index']>>>
    }
  }
  'transcriptions.show_by_recording': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/transcriptions/recording/:recId'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { recId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/transcriptions_controller').default['showByRecording']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/transcriptions_controller').default['showByRecording']>>>
    }
  }
  'transcriptions.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/transcriptions/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/transcriptions_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/transcriptions_controller').default['destroy']>>>
    }
  }
}
