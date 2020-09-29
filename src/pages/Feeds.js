import React from 'react'
import UploadButton from '../components/UploadButton'
import Feed from '../components/Feed'
import './Feeds.scss'

const Feeds = ({ contract, currentUser, nearConfig, wallet }) => (
  <main className="Feeds">    
    <Feed 
      contract={contract}
      currentUser={currentUser}
      nearConfig={nearConfig}
      wallet={wallet}/>
    <UploadButton 
      contract={contract}
      currentUser={currentUser}  
    />
  </main>
)

export default Feeds
