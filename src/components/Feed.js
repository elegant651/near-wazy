import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import Loading from './Loading'
import PhotoInfo from './PhotoInfo'
import Button from './Button'
import ui from '../utils/ui'
import Big from 'big.js'

import './Feed.scss'

const BOATLOAD_OF_GAS = Big(3).times(10 ** 13).toFixed()

class Feed extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      feeds: []
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
    const { contract, currentUser } =  this.props

    this.setState({isLoading: true})    

    contract.getTodoList().then((feeds)=> {
      console.log(feeds)
      this.setState({isLoading: false, feeds })
    })
  }

  async verify(todoId) {
    const { contract } =  this.props

    this.setState({isLoading: true})    

    const result = await contract.verifyTodo(
      { todoId: todoId },
      BOATLOAD_OF_GAS
    )
    console.log(result)

    contract.getTodoList().then((feeds)=> {
      console.log(feeds)
      this.setState({isLoading: false, feeds })
    })

  }

  render() {
    const { feeds } = this.state

    if (this.state.isLoading) return <Loading />

    return (
      <div className="Feed">
        {feeds.length !== 0
          ? feeds.map(({
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
  // feed: state.photos.feed  
})

const mapDispatchToProps = (dispatch) => ({
  // getFeed: () => dispatch(photoActions.getFeed()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Feed)
