import React, { Component } from 'react'
import { connect } from 'react-redux'
import imageCompression from '../utils/imageCompression';
import ui from '../utils/ui'
import Input from './Input'
import Textarea from './Textarea'
import Button from './Button'
import Big from 'big.js'
import axios from 'axios'

import * as photoActions from '../redux/actions/photos'

import './UploadPhoto.scss'

const MAX_IMAGE_SIZE = 30000 // 30KB
const MAX_IMAGE_SIZE_MB = 0.03 // 30KB
const BOATLOAD_OF_GAS = Big(3).times(10 ** 13).toFixed()

class UploadPhoto extends Component {
  state = {
    file: '',
    fileName: '', 
    title: '',
    warningMessage: '',
    isCompressing: false,
    isLoading: false
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleFileChange = (e) => {
    const file = e.target.files[0]
        
    if (file.size > MAX_IMAGE_SIZE) {
      this.setState({
        isCompressing: true,
      })
      return this.compressImage(file)
    }

    return this.setState({
      file,
      fileName: file.name,
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const { file, fileName, title } = this.state
    
    const { contract, currentUser } =  this.props

    this.setState({isLoading: true})

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
      this.setState({isLoading: false})
    
      ui.hideModal()
    })

  }

  compressImage = async (imageFile) => {
    try {
      const compressedFile = await imageCompression(imageFile, MAX_IMAGE_SIZE_MB)
      this.setState({
        isCompressing: false,
        file: compressedFile,
        fileName: compressedFile.name,
      })
    } catch (error) {
      this.setState({
        isCompressing: false,
        warningMessage: '* Fail to compress image'
      })
    }
  }

  render() {
    const { fileName, title, isCompressing, warningMessage } = this.state
    return (
      <form className="UploadPhoto" onSubmit={this.handleSubmit}>
        <input
          className="UploadPhoto__file"
          id="upload"
          type="file"
          name="file"
          label="Search file"          
          onChange={this.handleFileChange}
          err={warningMessage}
          accept=".png, .jpg, .jpeg"
          required
        />        
        <Textarea
          className="UploadPhoto__caption"
          name="title"
          value={title}
          label="Title"
          onChange={this.handleInputChange}
          placeholder="Your todo"
          required
        />

        { (this.state.isLoading) ? <Loading /> :
          <Button
            className="UploadPhoto__upload"
            type="submit"
            title="Create Todo"
          /> }
      </form>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  // uploadPhoto: (file, fileName, title) =>
  //   dispatch(photoActions.uploadPhoto(file, fileName, title)),
})

export default connect(null, mapDispatchToProps)(UploadPhoto)
