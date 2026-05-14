import { Bouncer } from '@adonisjs/bouncer'
import User from '#models/user'
import Meeting from '#models/meeting'
import Subscription from '#models/subscription'
import { DateTime } from 'luxon'

export const useMeetingFeature = Bouncer.ability(
  async (user: User) => {
    const subscription = await Subscription.query()
      .where('userId', user.uuid)
      .first()

    const isSubscriptionActive =
      subscription?.isSubscribed &&
      subscription.subscriptionExpiresAt &&
      subscription.subscriptionExpiresAt > DateTime.now()

    if (isSubscriptionActive) {
      return true
    }

    const meetingsCount = await Meeting.query()
      .where('createdBy', user.uuid)
      .count('* as total')

    const totalMeetings = Number(meetingsCount[0].$extras.total)

    return totalMeetings < 5
  }
)