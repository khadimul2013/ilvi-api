/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
// import MeetingsController from '#controllers/meeting_controller'

router.get('/', () => {
  return { hello: 'world' }
})

router
  .group(() => {
    router
      .group(() => {
        router.post('signup', [controllers.Auth, 'signup'])
        router.post('login', [controllers.Auth, 'signin'])
        router.post('forgot-password', [controllers.Auth, 'forgotPassword'])
        router.post('reset-password', [controllers.Auth, 'resetPassword'])
      })
      .prefix('auth')
      .as('auth')

    router
      .group(() => {
        router.post('logout', [controllers.Auth, 'destroy'])
        router.post('change-password', [controllers.Auth, 'changePassword'])
      })
      .prefix('auth')
      .use(middleware.auth())

    router
      .group(() => {
        router.get('/profile', [controllers.Profile, 'show'])
      })
      .prefix('account')
      .as('profile')
      .use(middleware.auth())

    router
      .group(() => {
        router.post('/meetings', [controllers.Meeting, 'store'])
        router.get('/meetings', [controllers.Meeting, 'index'])
        router.put('/meetings/:id', [controllers.Meeting, 'update'])
        router.post('/meetings/upload', [controllers.Meeting, 'uploadAudio'])
      })
      .use(middleware.auth())

    router.group(() => {
      router.post('/recordings', [controllers.Recordings, 'store'])
      router.get('/recordings', [controllers.Recordings, 'index'])
      router.delete('/recordings/:id', [controllers.Recordings, 'destroy'])
    }).use(middleware.auth())

    router.group(() => {
      router.get('/transcriptions', [controllers.Transcriptions, 'index'])
      router.get('/transcriptions/recording/:recId', [controllers.Transcriptions, 'showByRecording'])
      router.delete('/transcriptions/:id', [controllers.Transcriptions, 'destroy'])
    }).use(middleware.auth())

  })
  .prefix('/api/v1')


