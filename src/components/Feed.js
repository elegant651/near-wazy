import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loading from './Loading'
import PhotoInfo from './PhotoInfo'
import Button from './Button'
import ui from '../utils/ui'
import * as photoActions from '../redux/actions/photos'

import './Feed.scss'

class Feed extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false      
    }
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    const isUpdatedFeed = (nextProps.feed !== prevState.feed) && (nextProps.feed !== null)
    if (isUpdatedFeed) {
      return { isLoading: false }
    }
    return null
  }

  componentDidMount() {
    const { contract, getFeeds } = this.props
  
    getFeeds(contract)
  }

  async verify(todoId) {
    const { contract, verifyTodo } =  this.props    

    verifyTodo(contract, todoId)
  }

  render() {
    const { feed } = this.props    

    if (this.state.isLoading) return <Loading />

    return (
      <div className="Feed">
        {feed && feed.length !== 0
          ? feed.map(({
            todoId,
            owner,
            title,
            photo,            
            timestamp,
            isVerified,
            verifier
          }) => {

            const photoUri = `https://gateway.ipfs.io/ipfs/${photo}`
            
            return (
              <div className="FeedPhoto" key={todoId}>
                <div className="FeedPhoto__image">
                  <img src={photoUri} alt={title} />
                </div>
                <div className="FeedPhoto__info">
                  <PhotoInfo
                    name={owner}
                    caption={title}
                    isVerified={isVerified}
                    verifier={verifier}
                  />
                  {
                    isVerified ? <div>
                      <h3>Verified from {verifier}</h3>
                    </div> : <Button                        
                      alt="Verify"
                      title="verify"
                      onClick={this.verify.bind(this, todoId)}
                      />
                  }                  
                </div>
              </div>
            )
          })
          : <span className="Feed__empty">No List</span>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  feed: state.photos.feed  
})

const mapDispatchToProps = (dispatch) => ({
  getFeeds: (contract) => dispatch(photoActions.getFeeds(contract)),
  verifyTodo: (contract, todoId) => dispatch(photoActions.verifyTodo(contract, todoId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Feed)
