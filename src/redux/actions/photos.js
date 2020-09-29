import ui from '../../utils/ui'
import { SET_FEED } from './actionTypes'
import Big from 'big.js'
import axios from 'axios'

const BOATLOAD_OF_GAS = Big(3).times(10 ** 13).toFixed()

// Action creators

const setFeeds = (feeds) => ({
  type: SET_FEED,
  payload: { feeds },
})

const updateFeed = (tokenId) => (dispatch, getState) => {
  
}

// API functions

export const getFeeds = (contract) => (dispatch) => {  
  contract.getTodoList().then((feeds)=> {
    console.log(feeds)
    dispatch(setFeeds(feeds))
  })
}

export const verifyTodo = (contract, todoId) => (dispatch) => {
  contract.verifyTodo(
    { todoId: todoId },
    BOATLOAD_OF_GAS
  ).then((result) => {
    dispatch(getFeeds(contract))
  })

}

export const uploadTodo = (contract, title, file) => (dispatch) => {
  const formData = new FormData()
    formData.append('file', file)
    axios({
      method: 'post',
      baseURL: 'https://ipfs.infura.io:5001',
      url: '/api/v0/add',
      data: formData,
      headers: {'Content-Type': 'multipart/form-data'}
    }).then(async (response)=> {      
      const photoURI = response.data.Hash

      const result = await contract.writeTodo(
        { title: title, photo: photoURI },
        BOATLOAD_OF_GAS
      )
      console.log(result)
      
      dispatch(getFeeds(contract))      
    })
}