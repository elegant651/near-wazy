import React from 'react'

import './PhotoHeader.scss'

const PhotoHeader = ({ currentOwner, location }) => (
  <header className="PhotoHeader">    
    <p className="PhotoHeader__location">{location}</p>
  </header>
)

export default PhotoHeader
