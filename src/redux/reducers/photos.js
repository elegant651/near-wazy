import { SET_FEED } from '../actions/actionTypes'

const initialState = {
  feed: [],
}

const photoReducer = (state = initialState, action) => {  
  switch (action.type) {
    case SET_FEED:
      return {
        ...state,
        feed: action.payload.feeds,
      }
    default:
      return state;
  }
}

export default photoReducer
