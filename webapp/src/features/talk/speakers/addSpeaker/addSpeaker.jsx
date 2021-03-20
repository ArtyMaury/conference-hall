/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import PropTypes from 'prop-types'
import AddUserModal from 'features/invite/addUserModal'
import { useNotification } from 'app/layout/notification/context'

import './addSpeaker.css'
import { useAddSpeaker } from '../../../../data/talk'

const AddSpeaker = ({ talkId, talkTitle }) => {
  const { mutate: addSpeaker } = useAddSpeaker(talkId)
  const { sendError } = useNotification()

  const onSelectSpeaker = (speakerId) => {
    addSpeaker(speakerId, {
      onError: (err) => sendError(`An unexpected error has occurred: ${err.message}`),
    })
  }

  return (
    <AddUserModal
      title="Add a co-speaker"
      renderTrigger={({ show }) => (
        <button type="button" onClick={show} className="add-speaker-button">
          <span className="add-speaker-button-icon">
            <i className="fa fa-user fa-lg" />
          </span>
          <span className="add-speaker-button-label">Add a co-speaker</span>
        </button>
      )}
      resultsMessage="Add a co-speaker to your talk"
      onSelectUser={onSelectSpeaker}
      description={
        <>
          <p>
            Search and add a co-speaker to your talk, he/she will be also able to update it and
            submit it to any event.
          </p>
          <p>
            For security and privacy reasons, you can search a speaker only by his/her registered
            email address. Your co-speaker must already have a Conference Hall account.
          </p>
        </>
      }
      inviteEntity="talk"
      inviteEntityId={talkId}
      inviteEntityTitle={talkTitle}
    />
  )
}

AddSpeaker.propTypes = {
  talkId: PropTypes.string.isRequired,
  talkTitle: PropTypes.string.isRequired,
}

export default AddSpeaker