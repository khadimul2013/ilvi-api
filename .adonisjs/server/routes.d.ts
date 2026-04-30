import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.auth.signup': { paramsTuple?: []; params?: {} }
    'auth.auth.signin': { paramsTuple?: []; params?: {} }
    'auth.auth.forgot_password': { paramsTuple?: []; params?: {} }
    'auth.auth.reset_password': { paramsTuple?: []; params?: {} }
    'auth.destroy': { paramsTuple?: []; params?: {} }
    'auth.change_password': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'meetings.index': { paramsTuple?: []; params?: {} }
    'meetings.store': { paramsTuple?: []; params?: {} }
    'meetings.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'meeting.upload_audio': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'uploads.index': { paramsTuple?: []; params?: {} }
    'uploads.store': { paramsTuple?: []; params?: {} }
    'uploads.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'transcriptions.index': { paramsTuple?: []; params?: {} }
    'transcriptions.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'transcriptions.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'meetings.index': { paramsTuple?: []; params?: {} }
    'uploads.index': { paramsTuple?: []; params?: {} }
    'transcriptions.index': { paramsTuple?: []; params?: {} }
    'transcriptions.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  HEAD: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'meetings.index': { paramsTuple?: []; params?: {} }
    'uploads.index': { paramsTuple?: []; params?: {} }
    'transcriptions.index': { paramsTuple?: []; params?: {} }
    'transcriptions.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'auth.auth.signup': { paramsTuple?: []; params?: {} }
    'auth.auth.signin': { paramsTuple?: []; params?: {} }
    'auth.auth.forgot_password': { paramsTuple?: []; params?: {} }
    'auth.auth.reset_password': { paramsTuple?: []; params?: {} }
    'auth.destroy': { paramsTuple?: []; params?: {} }
    'auth.change_password': { paramsTuple?: []; params?: {} }
    'meetings.store': { paramsTuple?: []; params?: {} }
    'meeting.upload_audio': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'uploads.store': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'meetings.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PATCH: {
    'meetings.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'uploads.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'transcriptions.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}