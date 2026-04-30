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
    'meeting.store': { paramsTuple?: []; params?: {} }
    'meeting.index': { paramsTuple?: []; params?: {} }
    'meeting.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'meeting.upload_audio': { paramsTuple?: []; params?: {} }
    'recordings.store': { paramsTuple?: []; params?: {} }
    'recordings.index': { paramsTuple?: []; params?: {} }
    'recordings.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'transcriptions.index': { paramsTuple?: []; params?: {} }
    'transcriptions.show_by_recording': { paramsTuple: [ParamValue]; params: {'recId': ParamValue} }
    'transcriptions.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'meeting.index': { paramsTuple?: []; params?: {} }
    'recordings.index': { paramsTuple?: []; params?: {} }
    'transcriptions.index': { paramsTuple?: []; params?: {} }
    'transcriptions.show_by_recording': { paramsTuple: [ParamValue]; params: {'recId': ParamValue} }
  }
  HEAD: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'meeting.index': { paramsTuple?: []; params?: {} }
    'recordings.index': { paramsTuple?: []; params?: {} }
    'transcriptions.index': { paramsTuple?: []; params?: {} }
    'transcriptions.show_by_recording': { paramsTuple: [ParamValue]; params: {'recId': ParamValue} }
  }
  POST: {
    'auth.auth.signup': { paramsTuple?: []; params?: {} }
    'auth.auth.signin': { paramsTuple?: []; params?: {} }
    'auth.auth.forgot_password': { paramsTuple?: []; params?: {} }
    'auth.auth.reset_password': { paramsTuple?: []; params?: {} }
    'auth.destroy': { paramsTuple?: []; params?: {} }
    'auth.change_password': { paramsTuple?: []; params?: {} }
    'meeting.store': { paramsTuple?: []; params?: {} }
    'meeting.upload_audio': { paramsTuple?: []; params?: {} }
    'recordings.store': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'meeting.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'recordings.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'transcriptions.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}