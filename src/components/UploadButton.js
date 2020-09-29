import React from 'react'
import ui from '../utils/ui'
import UploadPhoto from './UploadPhoto'

import './UploadButton.scss'

const UploadButton = ({contract, currentUser}) => (
  <button
    className="UploadButton"
    onClick={() => ui.showModal({
      header: 'Upload Photo',
      content: <UploadPhoto contract={contract} currentUser={currentUser}   />,
    })}
  >
    New
  </button>
)

export default UploadButton
