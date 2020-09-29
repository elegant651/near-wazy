import React from 'react'
import cx from 'classnames'
import ui from '../utils/ui'
import Button from './Button'
import TransferOwnership from './TransferOwnership'

const TransferOwnershipButton = ({
  id,
  issueDate,
  currentOwner,
  className,
}) => (
  <Button
    className={cx('TransferOwnershipButton', className)}    
    alt="Transfer Ownership"
    onClick={() => ui.showModal({
      header: 'Transfer Ownership',
      content: (
        <TransferOwnership
          id={id}
          issueDate={issueDate}
          currentOwner={currentOwner}
        />
      ),
    })}
  />
)

export default TransferOwnershipButton
