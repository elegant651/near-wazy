import React, { Fragment } from 'react'

import './PhotoInfo.scss'

const PhotoInfo = ({ name, caption, isVerified, verifier }) => (
  <Fragment>
    <h2 className="PhotoInfo__name">{name}</h2>
    <p className="PhotoInfo__caption">{caption}</p>
  </Fragment>
)

export default PhotoInfo
