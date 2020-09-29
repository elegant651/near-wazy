import React from 'react'
import UploadButton from '../components/UploadButton'
import Feed from '../components/Feed'
import './Feeds.scss'

const Feeds = ({ contract, currentUser }) => (
  <main className="Feeds">    
    <Feed 
      contract={contract}
      currentUser={currentUser}
      />
    <UploadButton 
      contract={contract}
      currentUser={currentUser}  
    />
  </main>
)

export default Feeds
