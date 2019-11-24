import { inject } from '@k-ramel/react'

import AddSpeaker from './addSpeaker'

const mapStore = (store, props, { router }) => {
  const { uid: authId } = store.auth.get()
  const { origin } = window.location
  const talkId = router.getParam('talkId')
  return {
    inviteLink: `${origin}/speaker/talk/${talkId}/invite/${authId}`,
    onSelectUser: uid => {
      store.dispatch({ type: '@@ui/ADD_SPEAKER_TO_TALK', payload: { uid, talkId } })
    },
  }
}

export default inject(mapStore)(AddSpeaker)
