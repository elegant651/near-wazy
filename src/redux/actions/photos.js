import ui from '../../utils/ui'
import { SET_FEED } from './actionTypes'


// Action creators

const setFeed = (feed) => ({
  type: SET_FEED,
  payload: { feed },
})

const updateFeed = (tokenId) => (dispatch, getState) => {
  
}

const updateOwnerAddress = (tokenId, to) => (dispatch, getState) => {
  const { photos: { feed } } = getState()
  const newFeed = feed.map((photo) => {
    if (photo[ID] !== tokenId) return photo
    photo[OWNER_HISTORY].push(to)
    return photo
  })
  dispatch(setFeed(newFeed))
}


// API functions

export const getFeed = () => (dispatch) => {
  
}

export const uploadPhoto = (
  file,
  fileName,  
  title
) => (dispatch) => {
  const reader = new window.FileReader()
  reader.readAsArrayBuffer(file)
  reader.onloadend = () => {
    const buffer = Buffer.from(reader.result)
    /**
     * Add prefix `0x` to hexString
     * to recognize hexString as bytes by contract
     */
    const hexString = "0x" + buffer.toString('hex')
    
  }
}

export const transferOwnership = (tokenId, to) => (dispatch) => {
  
}
