import 'regenerator-runtime/runtime'
import React, { useCallback } from 'react'
import FeedPage from './pages/Feeds'
import Modal from './components/Modal'
import Toast from './components/Toast'
import PropTypes from 'prop-types'


const App = ({ contract, currentUser, nearConfig, wallet }) => {
  
  const signIn = useCallback(() => {
    wallet.requestSignIn(
      nearConfig.contractName,
      'NEAR Guest Book'
    )
  }, [])

  const signOut = useCallback(() => {
    wallet.signOut()
    window.location.replace(window.location.origin + window.location.pathname)
  }, [])

  return (
    <main>
      <Modal />
      <Toast />

      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <h1>WazyNear</h1>
        {currentUser
          ? <button onClick={signOut}>Log out</button>
          : <button onClick={signIn}>Log in</button>
        }
      </header>
      {currentUser ? (
        <></>
      ) : (
        <>
          <p>
            WazyNear is an DApp that can create Todo and prove it to other users.
          </p>
          <p>
            Tech Stack: React, Redux, Near-js, Near-as, IPFS, Near Testnet
          </p>
          <p>
            Sign in to try it out!
          </p>        
        </>
      )}
      {!!currentUser && (
        <>
          <FeedPage
            contract={contract}
            currentUser={currentUser}            
          />
        </>
      )}
    </main>
  )
}

App.propTypes = {
  contract: PropTypes.shape({
    addMessage: PropTypes.func.isRequired,
    getMessages: PropTypes.func.isRequired
  }).isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired
  }),
  nearConfig: PropTypes.shape({
    contractName: PropTypes.string.isRequired
  }).isRequired,
  wallet: PropTypes.shape({
    requestSignIn: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired
  }).isRequired
}

export default App
