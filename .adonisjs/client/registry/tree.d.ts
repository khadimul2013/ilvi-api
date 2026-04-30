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
  meeting: {
    store: typeof routes['meeting.store']
    index: typeof routes['meeting.index']
    update: typeof routes['meeting.update']
    uploadAudio: typeof routes['meeting.upload_audio']
  }
  recordings: {
    store: typeof routes['recordings.store']
    index: typeof routes['recordings.index']
    destroy: typeof routes['recordings.destroy']
  }
  transcriptions: {
    index: typeof routes['transcriptions.index']
    showByRecording: typeof routes['transcriptions.show_by_recording']
    destroy: typeof routes['transcriptions.destroy']
  }
}
