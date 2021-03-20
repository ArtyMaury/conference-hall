import React from 'react'
import PropTypes from 'prop-types'

import TotalRatings from 'features/ratings/totalRatings'
import Badge from 'components/badge'

import './proposalInfo.css'

const ProposalInfo = ({ event, proposal, isMobile }) => {
  const { deliberationEnabled, displayProposalsRatings } = event
  const { status, emailStatus } = proposal
  return (
    <div className="proposal-item-info">
      {!isMobile && deliberationEnabled && (
        <>
          {status === 'ACCEPTED' && (
            <Badge outline success>
              Accepted
            </Badge>
          )}
          {status === 'REJECTED' && (
            <Badge outline error>
              Rejected
            </Badge>
          )}
          {status === 'CONFIRMED' && (
            <Badge outline success>
              Confirmed by speaker
            </Badge>
          )}
          {status === 'DECLINED' && (
            <Badge outline error>
              Declined by speaker
            </Badge>
          )}
          {emailStatus === 'SENDING' && (
            <Badge outline light>
              Sending email...
            </Badge>
          )}
          {emailStatus === 'SENT' && (
            <Badge outline info>
              Email sent
            </Badge>
          )}
          {emailStatus === 'DELIVERED' && (
            <Badge outline success>
              Email delivered
            </Badge>
          )}
        </>
      )}
      {displayProposalsRatings && <TotalRatings stats={proposal.ratingStats} />}
    </div>
  )
}

ProposalInfo.propTypes = {
  event: PropTypes.object.isRequired,
  proposal: PropTypes.object.isRequired,
  isMobile: PropTypes.bool.isRequired,
}

export default ProposalInfo