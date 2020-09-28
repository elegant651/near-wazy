import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import ui from './ui'
import photos from './photos'

const reducer = combineReducers({
  routing: routerReducer,  
  ui,
  photos,
})

export default reducer
