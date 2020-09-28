import React from 'react'
import UploadButton from '../components/UploadButton'
import Feed from '../components/Feed'
import './Feeds.scss'

const Feeds = () => (
  <main className="Feeds">    
    <Feed />
    <UploadButton />
  </main>
)

export default Feeds
