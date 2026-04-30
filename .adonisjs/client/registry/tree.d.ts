/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    auth: {
      signup: typeof routes['auth.auth.signup']
      signin: typeof routes['auth.auth.signin']
      forgotPassword: typeof routes['auth.auth.forgot_password']
      resetPassword: typeof routes['auth.auth.reset_password']
    }
    destroy: typeof routes['auth.destroy']
    changePassword: typeof routes['auth.change_password']
  }
  profile: {
    profile: {
      show: typeof routes['profile.profile.show']
    }
  }
  meetings: {
    index: typeof routes['meetings.index']
    store: typeof routes['meetings.store']
    update: typeof routes['meetings.update']
  }
  meeting: {
    uploadAudio: typeof routes['meeting.upload_audio']
  }
  uploads: {
    index: typeof routes['uploads.index']
    store: typeof routes['uploads.store']
    destroy: typeof routes['uploads.destroy']
  }
  transcriptions: {
    index: typeof routes['transcriptions.index']
    show: typeof routes['transcriptions.show']
    destroy: typeof routes['transcriptions.destroy']
  }
}
