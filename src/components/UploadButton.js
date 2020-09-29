import React from 'react'
import ui from '../utils/ui'
import UploadPhoto from './UploadPhoto'

import './UploadButton.scss'

const UploadButton = () => (
  <button
    className="UploadButton"
    onClick={() => ui.showModal({
      header: 'Upload Photo',
      content: <UploadPhoto />,
    })}
  >
    New
  </button>
)

export default UploadButton
